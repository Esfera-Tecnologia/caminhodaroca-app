import BackButton from "@/components/BackButton";
import { LoadingList } from "@/components/LoadingList";
import RecordNotFound from "@/components/RecordNotFound";
import { useEvents } from "@/hooks/useEvents";
import { theme } from "@/theme";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export default function EventDetailScreen() {
  const { event: eventId } = useLocalSearchParams<{ event: string }>();
  const router = useRouter();
  const { data: events, loading } = useEvents({});

  const eventDetail = useMemo(() => {
    if (!eventId) return null;
    return events.find(e => e.id.toString() === eventId);
  }, [eventId, events]);

  if (loading) {
    return <LoadingList text="Carregando evento..." />;
  }

  if (!eventDetail) {
    return (
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <RecordNotFound />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <BackButton onPress={() => router.back()} />
      {eventDetail.image_url ? (
        <Image
          source={{ uri: eventDetail.image_url }}
          style={styles.eventImage}
        />
      ) : (
        <View style={[styles.eventImage, styles.eventImagePlaceholder]}>
          <Text style={styles.eventImagePlaceholderText}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.eventTitle}>{eventDetail.name}</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Localização</Text>
          <Text style={styles.infoValue}>{eventDetail.location || 'Não informada'}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Data de Início</Text>
          <Text style={styles.infoValue}>{formatDate(eventDetail.start_date || '')}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Data de Término</Text>
          <Text style={styles.infoValue}>{formatDate(eventDetail.end_date || '')}</Text>
        </View>
        {eventDetail.description && (
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Descrição</Text>
            <Text style={styles.infoValue}>{eventDetail.description}</Text>
          </View>
        )}
        {eventDetail.url && (
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>URL</Text>
            <Text style={styles.infoValue}>{eventDetail.url}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  eventImagePlaceholder: {
    backgroundColor: '#edf2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImagePlaceholderText: {
    color: '#718096',
    fontSize: 16,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7a8682',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    color: '#29443d',
    lineHeight: 20,
  },
});
