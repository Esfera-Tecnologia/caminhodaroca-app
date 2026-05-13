import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import SearchProperties from "@/components/controls/SearchProperties";
import DefaultModal from "@/components/DefaultModal";
import { EmptyList } from "@/components/EmptyList";
import { LoadingList } from "@/components/LoadingList";
import Review from "@/components/Review";
import TextPlaceholder from "@/components/TextPlaceholder";
import VisitedBadge from "@/components/VisitedBadge";
import { useAuth } from "@/context/AuthContext";
import { useUserLocation } from "@/context/LocationContext";
import { HomeEventType, useEvents } from "@/hooks/useEvents";
import { FavoriteList, useFavoriteLists } from "@/hooks/useFavoriteLists";
import { PropertyItemType, useProperties } from "@/hooks/useProperties";
import HomeFilters, { PropertyFilters } from "@/modules/protected/HomeFilters";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { formatDatePeriod, formatter } from "@/util";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropertyItem = ({ property, lists }: { property: PropertyItemType, lists?: FavoriteList[] }) => {
  const { location: userLocation } = useUserLocation();
  return (
    <Pressable style={[styles.card, globalStyles.shadowSm]} onPress={() => router.push({
      pathname: '/home/property/[property]',
      params: {
        property: property.id
      }
    })}>
      <Image source={{ uri: property.logo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{property.name}</Text>
        <Review length={5} review={property.rating} />
        <View style={[globalStyles.row, globalStyles.itemsCenter]}>
          <FontAwesome6 name="location-dot" size={12} color={theme.colors.body} style={{ marginStart: 2 }} />
          <Text style={[styles.details, { marginStart: 6 }]}>{property.location.city}</Text>
        </View>
        {userLocation && (
          <View style={[globalStyles.row, globalStyles.itemsCenter]}>
            <FontAwesome6 name="route" size={12} color={theme.colors.body} />
            <Text style={styles.details}>
              {formatter.format(property.distance || 0)} km
            </Text>
          </View>
        )}
        {property.isVisited && (
          <VisitedBadge size="sm" />
        )}
        {property.favorite_list_ids && property.favorite_list_ids.length > 0 && lists && lists.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {property.favorite_list_ids.map(id => {
              const listName = lists.find(l => l.id === id)?.name;
              if (!listName) return null;
              return (
                <View key={id} style={styles.listBadgeMini}>
                  <FontAwesome name="heart" size={12} color="#e25563" />
                  <Text style={styles.listBadgeMiniText}>{listName}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
      <FontAwesome6 name="chevron-right" size={16} color={theme.colors.secondary} style={{ marginEnd: 12 }} />
      
      {property.isFavorited && (
        <View style={styles.favoriteBadge}>
          <FontAwesome name="heart" size={16} color="#e25563" />
        </View>
      )}
    </Pressable>
  )
}

const EventCarouselItem = ({ event }: { event: HomeEventType }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: '/(protected)/home/events/[event]',
        params: { event: event.id },
      })}
    >
      <ImageBackground
        source={{ uri: event.image_url }}
        style={styles.eventSlide}
        contentFit="cover">
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.08)',
            'rgba(0,0,0,0.78)'
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ height: '100%' }}
        >
          <View style={styles.eventContent}>
            <View style={styles.eventBadges}>
              <View style={styles.eventBadge}>
                <Text style={styles.eventLocation} numberOfLines={1}>{formatDatePeriod(event.start_date || '', event.end_date || '')}</Text>
              </View>
              <View style={styles.eventBadge}>
                <Text style={styles.eventLocation} numberOfLines={1}>{event.location}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.eventTitle} numberOfLines={2}>{event.name}</Text>
              <Text style={styles.eventDescription} numberOfLines={3}>{event.description}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const EventsCarousel = () => {
  const { data: events, loading: eventsLoading } = useEvents({ filter: 'upcoming' });
  if (eventsLoading || !events.length) {
    return;
  }
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Eventos em destaque</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push({ pathname: '/(protected)/home/events' })}>
          <Text style={styles.sectionLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          data={events.map((event) => ({
            id: event.id,
            render: () => <EventCarouselItem event={event} />,
          }))}
          height={200}
          autoPlay
          autoPlayInterval={5000}
          loop
          showIndicators
          indicatorWrapperStyle={{ bottom: 4 }}
          nextControlStyle={{ right: 0 }}
          prevControlStyle={{ left: 0 }}
        />
      </View>
    </>
  );
};

const PropertiesList = ({ filters }: { filters?: PropertyFilters }) => {
  const { data } = useProperties(filters);
  const { loading: userLocationLoading } = useUserLocation();
  const { lists } = useFavoriteLists();
  return (
    <View style={{ flex: 1 }}>
      {!userLocationLoading ? (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          style={{ flex: 1 }}
          data={data}
          ListHeaderComponent={<EventsCarousel />}
          ListEmptyComponent={
            <EmptyList text="Infelizmente, não pudemos encontrar nenhuma propriedade próxima a sua localização no momento" />
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (<PropertyItem property={item} lists={lists} />)}
        />
      ) : (
        <View style={{ marginHorizontal: 16 }}>
          <EventsCarousel />
          <LoadingList text="Carregando lista de propriedades..." />
        </View>
      )}
    </View>
  )
}

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>();
  const [userCity, setUserCity] = useState<string | null>('Rio de Janeiro');
  const { user, showWelcomeModal, setShowWelcomeModal } = useAuth();
  const { location, loading: userLocationLoading } = useUserLocation();

  useEffect(() => {
    if (!location) return;
    (async () => {
      try {
        const [address] = await Location.reverseGeocodeAsync({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setUserCity(address.city || address.region);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={globalStyles.textBase}>
          Bem-vindo! <Text style={globalStyles.bold}>{user?.name || 'Convidado'}!</Text>
        </Text>
        {userLocationLoading ? (
          <>
            <TextPlaceholder />
            <TextPlaceholder />
          </>
        ) : (
          <Text style={{ lineHeight: 20 }}>
            {location ? (
              <>
                <Text>Buscando propriedades próximas à sua localização:{" "}</Text>
                <Text style={globalStyles.bold}>{userCity}.</Text>
              </>
            ) : (
              <>
                <Text>Buscando propriedades próximas à localização de:{" "}</Text>
                <Text style={globalStyles.bold}>{userCity}</Text>
              </>
            )}
          </Text>
        )}
      </View>
      <View style={styles.content}>
        <View style={[globalStyles.row, globalStyles.itemsCenter, { marginBottom: 16 }]}>
          <SearchProperties onSearch={(search) => setFilters((filters) => ({ ...filters, keyword: search }))} />
          <TouchableOpacity style={styles.filters} onPress={() => setIsFiltersOpen(true)}>
            <Ionicons name="options-outline" size={22} color="#00796B" />
          </TouchableOpacity>
        </View>
      </View>
      <PropertiesList filters={filters} />
      <HomeFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={setFilters}
        title="Filtros"
        direction="right" />
      <DefaultModal
        visible={!!showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}>
        <View style={{ padding: 8 }}>
          <View>
            <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
            <Text style={styles.welcomeDescription}>
              Notamos que seu cadastro está incompleto. Acesse o seu perfil
              para preencher os seus dados!
            </Text>
            <Button title="Continuar" onPress={() => {
              setShowWelcomeModal(false)
              router.push('/home/profile')
            }} />
          </View>
        </View>
      </DefaultModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  welcome: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderTopColor: "#0000002D",
    borderRightColor: "#0000002D",
    borderBottomColor: "#0000002D",
    borderLeftColor: theme.colors.primary,
  },
  image: {
    width: 120,
    height: '100%',
    minHeight: 120,
  },
  info: {
    flex: 1,
    padding: 8,
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.success,
    marginBottom: 2,
  },
  details: {
    fontSize: 14,
    color: theme.colors.body,
    marginStart: 4
  },
  results: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 600,
    marginBottom: 16,
  },
  filters: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.colors.success,
  },
  sectionLink: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  carouselContainer: {
    marginBottom: 16,
  },
  eventSlide: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  eventContent: {
    height: '100%',
    padding: 16,
    justifyContent: 'space-between'
  },
  eventBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  eventBadge: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  eventLocation: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#fff'
  },
  eventDescription: {
    fontSize: 14,
    color: '#fff',
  },
  eventLoading: {
    color: theme.colors.body,
    fontSize: 14,
    paddingBottom: 16,
  },
  eventEmpty: {
    color: theme.colors.body,
    fontSize: 14,
    paddingBottom: 16,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 10,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 10,
      spreadDistance: 0,
      color: 'rgba(0, 0, 0, 0.12)',
    }]
  },
  listBadgeMini: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffe8ec',
    borderRadius: 999,
  },
  listBadgeMiniText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#b8475b',
  },
});
