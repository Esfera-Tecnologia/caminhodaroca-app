import BackButton from "@/components/BackButton";
import RecordNotFound from "@/components/RecordNotFound";
import { useEventDetail } from "@/hooks/useEventDetail";
import { theme } from "@/theme";
import { formatDatePeriod, formatDatePeriodLong } from "@/util";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EventDetailScreen() {
  const { event: eventId } = useLocalSearchParams<{ event: string }>();
  const router = useRouter();
  const { data: event, loading } = useEventDetail(eventId);

  if (loading) {
    return;
  }
  if (!event) {
    return (
      <View style={styles.container}>
        <BackButton style={styles.backButtonFallback} />
        <RecordNotFound />
      </View>
    );
  }
  const badge = formatDatePeriod(event.start_date || '', event.end_date || '');
  const when = formatDatePeriodLong(event.start_date, event.end_date);
  const hasProperties = Array.isArray(event.properties) && event.properties.length > 0;
  const hasUrl = !!event.url;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {event.image_url ? (
          <Image
            source={{ uri: event.image_url }}
            style={styles.coverImage}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.coverImage, styles.coverImagePlaceholder]}>
            <FontAwesome6 name="image" size={40} color="#b0c4be" />
          </View>
        )}
        <View style={styles.card}>
          {badge ? (
            <View style={styles.badge}>
              <FontAwesome6 name="calendar-days" size={13} color={theme.colors.primary} />
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
          <Text style={styles.title}>{event.name}</Text>
          {event.description ? (
            <Text style={styles.subtitle}>{event.description}</Text>
          ) : null}
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Quando</Text>
              <Text style={styles.infoValue}>{when}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Onde</Text>
              <Text style={styles.infoValue}>{event.location || 'Não informado'}</Text>
            </View>
            {event.organization ? (
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Organização</Text>
                <Text style={styles.infoValue}>{event.organization}</Text>
              </View>
            ) : null}
          </View>
          {event.full_description ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre o evento</Text>
              <Text style={styles.description}>{event.full_description}</Text>
            </View>
          ) : null}
          {hasProperties ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Propriedades vinculadas</Text>
              <Text style={styles.propertiesHelper}>
                Toque no nome da propriedade para abrir a página de detalhes.
              </Text>
              <View style={styles.propertiesList}>
                {event.properties!.map((prop) => (
                  <TouchableOpacity
                    key={prop.id}
                    style={styles.propertyLink}
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push({
                        pathname: '/(protected)/home/property/[property]',
                        params: { property: prop.id },
                      })
                    }
                  >
                    <Text style={styles.propertyName}>{prop.name}</Text>
                    <Octicons name="chevron-right" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}
          {hasUrl ? (
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(event.url!)}
            >
              <FontAwesome6 name="arrow-up-right-from-square" size={14} color="#fff" />
              <Text style={styles.actionButtonText}>Acessar página do evento</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  backButtonFallback: {
    margin: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 22,
    padding: 10,
    alignSelf: 'flex-start',
  },
  coverImage: {
    width: '100%',
    height: 220,
  },
  coverImagePlaceholder: {
    backgroundColor: '#d8e8e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginTop: -42,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    zIndex: 2,
    boxShadow: [{
      offsetX: 0,
      offsetY: 8,
      blurRadius: 24,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.12)',
    }],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e9f5f2',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    lineHeight: 30,
    marginBottom: 10,
  },
  subtitle: {
    color: '#66706c',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  infoGrid: {
    gap: 10,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f8faf9',
    borderWidth: 1,
    borderColor: '#e0e8e5',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#5f6b67',
    lineHeight: 20,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#4f5e59',
    lineHeight: 24,
  },
  propertiesHelper: {
    fontSize: 14,
    color: '#6b7772',
    marginBottom: 12,
  },
  propertiesList: {
    gap: 10,
  },
  propertyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e8e5',
    backgroundColor: '#f8faf9',
  },
  propertyName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
