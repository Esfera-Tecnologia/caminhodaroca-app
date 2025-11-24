import Button from "@/components/Button";
import SearchProperties from "@/components/controls/SearchProperties";
import DefaultModal from "@/components/DefaultModal";
import { EmptyList } from "@/components/EmptyList";
import { LoadingList } from "@/components/LoadingList";
import Review from "@/components/Review";
import TextPlaceholder from "@/components/TextPlaceholder";
import { useAuth } from "@/context/AuthContext";
import { useUserLocation } from "@/context/LocationContext";
import { PropertyItemType, useProperties } from "@/hooks/useProperties";
import HomeFilters, { PropertyFilters } from "@/modules/protected/HomeFilters";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { formatter } from "@/util";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from 'expo-location';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropertyItem = ({property}: {property: PropertyItemType}) => {
  const {location: userLocation} = useUserLocation();
  return (
    <Pressable style={[styles.card, globalStyles.shadowSm]} onPress={() => router.push({
      pathname: '/home/property/[property]',
      params: {property: property.id
    }})}>
      <Image source={{uri: property.logo}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{property.name}</Text>
        <Review length={5} review={property.rating}/>
        <View style={[globalStyles.row, globalStyles.itemsCenter]}>
          <FontAwesome6 name="location-dot" size={12} color={theme.colors.body} style={{marginStart: 2}} />
          <Text style={[styles.details, {marginStart: 6}]}>{property.location.city}</Text>
        </View>
        {userLocation && (
          <View style={[globalStyles.row, globalStyles.itemsCenter]}>
            <FontAwesome6 name="route" size={12} color={theme.colors.body} />
            <Text style={styles.details}>
              {formatter.format(property.distance || 0)} km
            </Text>
          </View>
        )}
      </View>
      <FontAwesome6 name="chevron-right" size={16} color={theme.colors.secondary} style={{marginEnd: 12}} />
    </Pressable>
  )
}

const PropertiesList = ({filters}: {filters?: PropertyFilters}) => {
  const { data, loading: propertiesLoading } = useProperties(filters);
  const {loading: userLocationLoading} = useUserLocation();
  return (
    <View style={{flex: 1}}>
      {! propertiesLoading  && ! userLocationLoading ? (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ flex: 1 }}
          data={data}
          ListEmptyComponent={
            <EmptyList text="Infelizmente, não pudemos encontrar nenhuma
              propriedade próxima a sua localização no momento" />
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => ( <PropertyItem property={item} /> )}
        />
      ) : (
        <View style={{marginHorizontal: 16}}>
          <LoadingList text="Carregando lista de propriedades..."/>
        </View>
      )}
    </View>
  )
}

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] =  useState<PropertyFilters>();
  const [userCity, setUserCity] = useState<string | null>('Rio de Janeiro');
  const { user, showWelcomeModal, setShowWelcomeModal } = useAuth();
  const {location, loading: userLocationLoading} = useUserLocation();

  useEffect(() => {
    if (!location) return;
    setFilters((prev) => ({ ...prev, useCurrentLocation: true }));
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
          <Text style={{lineHeight: 20}}>
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
        <View style={[globalStyles.row, globalStyles.itemsCenter, {marginBottom: 16}]}>
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
        <View style={{padding: 8}}>
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
    borderRadius:20,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 14, 
    marginBottom: 16,
  }
});
