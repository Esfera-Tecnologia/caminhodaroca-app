import SearchInput from "@/components/controls/SearchInput";
import { EmptyList } from "@/components/EmptyList";
import { LoadingList } from "@/components/LoadingList";
import { EventFilterType, HomeEventType, useEvents } from "@/hooks/useEvents";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { formatDatePeriod } from "@/util";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const filterButtons: { filter: EventFilterType; label: string }[] = [
  { filter: 'upcoming', label: 'Próximos' },
  { filter: 'expired', label: 'Expirados' },
];

const EventItem = ({ event }: { event: HomeEventType }) => (
  <View style={[styles.eventCard, globalStyles.shadowSm]}>
    {event.image_url ? (
      <Image source={{ uri: event.image_url }} style={styles.eventImage} />
    ) : (
      <View style={[styles.eventImage, styles.eventImagePlaceholder]}>
        <Text style={styles.eventImagePlaceholderText}>Sem imagem</Text>
      </View>
    )}
    <View style={styles.eventInfo}>
      <View style={styles.eventBadge}>
        <FontAwesome6 name="calendar-days" size={14} color="#006D60" />
        <Text style={styles.eventPeriod}>{formatDatePeriod(event.start_date || '', event.end_date || undefined)}</Text>
      </View>
      <Text style={styles.eventName} numberOfLines={2}>{event.name}</Text>
      <Text style={styles.eventDescription} numberOfLines={3}>{event.description}</Text>
      <View style={styles.eventFooter}>
        {event.location ? (
          <View style={styles.textWithIcon}>
            <FontAwesome6 name="location-dot" size={14} color="#6b7773" />
            <Text style={styles.eventLocation}>
              {event.location}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.textWithIcon} activeOpacity={0.7} onPress={() => router.push({ pathname: '/(protected)/home/events' })}>
          <Text style={styles.eventLocation}>
            Ver detalhes
          </Text>
          <FontAwesome5 name="chevron-right" size={14} color="#6b7773"/>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function EventsIndex() {
  const [selectedFilter, setSelectedFilter] = useState<EventFilterType>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading } = useEvents({ filter: selectedFilter, search: searchTerm });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <Text style={styles.description}>
        Acompanhe os eventos disponíveis na região e veja o que está acontecendo nos próximos dias.
      </Text>
      <View style={[globalStyles.row, globalStyles.itemsCenter, styles.searchRow]}>
        <SearchInput
          placeholder="Buscar evento por nome ou local"
          onSearch={(search) => setSearchTerm(search)}
        />
      </View>
      <View style={[globalStyles.row, styles.filtersRow]}>
        {filterButtons.map((button) => (
          <TouchableOpacity
            key={button.filter}
            style={[
              styles.filterButton,
              selectedFilter === button.filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(button.filter)}
          >
            <Text
              style={[
                styles.filterLabel,
                selectedFilter === button.filter && styles.filterLabelActive,
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => router.push({ pathname: '/(protected)/home/events/calendar' })}
        >
          <Text style={[styles.filterLabel]}>Calendário</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <LoadingList text="Carregando eventos..." />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContent}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyList text="Nenhum evento encontrado para os filtros ou busca selecionados." />
          }
          renderItem={({ item }) => <EventItem event={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: theme.colors.success,
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#66706c',
    marginBottom: 18,
    lineHeight: 20,
  },
  searchRow: {
    marginBottom: 14,
    width: '100%',
  },
  filtersRow: {
    marginBottom: 22,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfe7e4',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterLabel: {
    fontSize: 14,
    color: '#5a6a66',
    fontWeight: 600,
  },
  filterLabelActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    boxShadow: [{
      offsetX: 0,
      offsetY: 8,
      blurRadius: 22,
      spreadDistance: 0,
      color: 'rgba(0, 0, 0, 0.08)'
    }]
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventImagePlaceholder: {
    backgroundColor: '#edf2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImagePlaceholderText: {
    color: '#718096',
  },
  eventInfo: {
    alignItems: 'flex-start',
    padding: 16,
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e9f5f2',
    marginBottom: 10,
  },
  eventPeriod: {
    fontSize: 12,
    fontWeight: 700,
    color: '#006D60',
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.success,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#606c69',
    lineHeight: 20,
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 14,
    fontWeight:600,
    color: '#6b7773',
  },
  textWithIcon: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
});
