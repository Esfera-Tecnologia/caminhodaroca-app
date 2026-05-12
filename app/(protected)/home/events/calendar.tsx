import { CalendarStatsType, useCalendarStats } from "@/hooks/useCalendarStats";
import { HomeEventType, useEvents } from "@/hooks/useEvents";
import { theme } from "@/theme";
import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const CELL_GAP = 5; // gap entre as células do calendário (px)
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const formatDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const days: { day: number | null; date: string | null }[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, date: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDateString(year, month, day);
    days.push({ day, date: dateStr });
  }

  return days;
};

const EventListItem = ({ event }: { event: HomeEventType }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.dayEventItem}
      onPress={() => {
        router.push({
          pathname: '/(protected)/home/events/[event]',
          params: { event: event.id },
        });
      }}
      activeOpacity={0.7}
    >
      {event.image_url ? (
        <Image source={{ uri: event.image_url }} style={styles.dayEventImage} />
      ) : (
        <View style={[styles.dayEventImage, styles.dayEventImagePlaceholder]}>
          <Text style={styles.dayEventPlaceholderText}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.dayEventContent}>
        <Text style={styles.dayEventTitle} numberOfLines={2}>{event.name}</Text>
        <Text style={styles.dayEventDetails} numberOfLines={1}>
          {event.location || 'Sem localização'}
        </Text>
      </View>
      <Octicons name="chevron-right" size={20} color={'#62B55A'} />
    </TouchableOpacity>
  );
};

export default function EventsCalendarScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const cellSize = (screenWidth - 18 * 2 - 14 * 2 - CELL_GAP * 6) / 7;
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [eventsCardY, setEventsCardY] = useState<number | null>(null);

  const { stats, loading: calendarLoading } = useCalendarStats(month, year);
  const { data: allEvents } = useEvents({});

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  const statsMap = useMemo(() => {
    const map = new Map<string, CalendarStatsType>();
    stats.forEach(stat => {
      map.set(stat.date, stat);
    });
    return map;
  }, [stats]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    const stat = statsMap.get(selectedDate);
    if (!stat) return [];
    return allEvents.filter(e => e.start_date?.startsWith(selectedDate));
  }, [selectedDate, statsMap, allEvents]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  const handleDayPress = (date: string) => {
    const stat = statsMap.get(date);
    if (!stat) return;

    if (stat.count === 1 && stat.single_event_id) {
      router.push({
        pathname: '/(protected)/home/events/[event]',
        params: { event: stat.single_event_id },
      });
    } else if (stat.count > 1) {
      setSelectedDate(prev => {
        if (prev !== date) setEventsCardY(null);
        return date;
      });
    }
  };

  // Scroll automático para o card de eventos ao selecionar um dia
  useEffect(() => {
    if (selectedDate && eventsCardY !== null) {
      const timeout = setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: eventsCardY, animated: true });
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [selectedDate, eventsCardY]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Calendário de eventos</Text>
      <Text style={styles.description}>
        Veja os eventos do mês. Dias com programação aparecem marcados no calendário.
      </Text>

      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => router.push({ pathname: '/(protected)/home/events' })}
        >
          <Text style={styles.filterLabel}>Próximos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => router.push({ pathname: '/(protected)/home/events', params: { filter: 'expired' } })}
        >
          <Text style={styles.filterLabel}>Expirados</Text>
        </TouchableOpacity>
        <View style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={[styles.filterLabel, styles.filterLabelActive]}>Calendário</Text>
        </View>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.monthNav}
            onPress={handlePrevMonth}
          >
            <Octicons name="chevron-left" size={20} color={theme.colors.primary} style={{marginRight: 2}}/>
          </TouchableOpacity>

          <Text style={styles.monthLabel}>
            {MONTHS[month - 1]} de {year}
          </Text>

          <TouchableOpacity
            style={styles.monthNav}
            onPress={handleNextMonth}
          >
            <Octicons name="chevron-right" size={20} color={theme.colors.primary} style={{marginLeft: 2}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((weekday) => (
            <Text key={weekday} style={styles.weekday}>
              {weekday}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarDays.map((dayObj, idx) => {
            if (dayObj.day === null) {
              return <View key={`empty-${idx}`} style={[styles.calendarDay, styles.calendarDayDisabled, { width: cellSize }]} />;
            }

            const stat = !calendarLoading ? statsMap.get(dayObj.date!) : undefined;
            const hasEvent = stat && stat.count > 0;
            const isSelected = selectedDate === dayObj.date;

            return (
              <TouchableOpacity
                key={dayObj.date}
                style={[
                  styles.calendarDay,
                  { width: cellSize },
                  hasEvent && styles.calendarDayWithEvent,
                  isSelected && styles.calendarDaySelected,
                  !hasEvent && styles.calendarDayDisabled,
                ]}
                onPress={() => dayObj.date && handleDayPress(dayObj.date)}
                disabled={!hasEvent}
                activeOpacity={0.7}
              >
                <Text style={styles.calendarDayNumber}>{dayObj.day}</Text>
                {stat && stat.count > 0 && (
                  <View style={styles.calendarMarker}>
                    {stat.count === 1 ? (
                      <View style={styles.calendarDot} />
                    ) : (
                      <View style={styles.calendarCount}>
                        <Text style={styles.calendarCountText}>{stat.count}</Text>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {selectedDate && selectedDayEvents.length > 0 && (
        <View
          style={styles.dayEventsCard}
          onLayout={(e) => setEventsCardY(e.nativeEvent.layout.y)}
        >
          <Text style={styles.dayEventsTitle}>
            Eventos em {new Date(selectedDate).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })}
          </Text>
          <Text style={styles.dayEventsDescription}>
            Escolha um evento para ver os detalhes.
          </Text>
          <FlatList
            scrollEnabled={false}
            data={selectedDayEvents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EventListItem event={item} />}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.success,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#66706c',
    marginBottom: 18,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 22,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dfe7e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterLabel: {
    fontSize: 13,
    color: '#5a6a66',
    fontWeight: 600,
    textAlign: 'center',
  },
  filterLabelActive: {
    color: '#ffffff',
  },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 14,
    marginBottom: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 10,
      blurRadius: 24,
      spreadDistance: 0,
      color: 'rgba(0, 0, 0, 0.08)'
    }],
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthNav: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dbe7e3',
    backgroundColor: '#f8fbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    color: '#7a8682',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CELL_GAP,
  },
  calendarDay: {
    minHeight: 68,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#e4ece9',
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 10,
  },
  calendarDayEmpty: {
    aspectRatio: 1,
  },
  calendarDayWithEvent: {
    borderColor: '#b9d9d1',
    backgroundColor: '#f4fbf8',
  },
  calendarDaySelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  calendarDayDisabled: {
    backgroundColor: '#f8faf9',
    opacity: 0.5,
  },
  calendarDayNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#29443d',
  },
  calendarMarker: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#62B55A',
  },
  calendarCount: {
    minWidth: 22,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#62B55A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  calendarCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  dayEventsCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 10,
      blurRadius: 24,
      spreadDistance: 0,
      color: 'rgba(0, 0, 0, 0.08)',
    }]
  },
  dayEventsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 6,
  },
  dayEventsDescription: {
    fontSize: 14,
    color: '#66706c',
    lineHeight: 20,
  },
  dayEventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2ebe7',
    borderRadius: 18,
    backgroundColor: '#fbfdfc',
    marginTop: 12,
  },
  dayEventImage: {
    width: 68,
    height: 68,
    borderRadius: 14,
  },
  dayEventImagePlaceholder: {
    backgroundColor: '#edf2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayEventPlaceholderText: {
    color: '#718096',
    fontSize: 12,
  },
  dayEventContent: {
    flex: 1,
  },
  dayEventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  dayEventDetails: {
    fontSize: 12,
    color: '#67716d',
  },
});
