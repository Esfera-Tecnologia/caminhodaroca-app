import SearchInput from "@/components/controls/SearchInput";
import Review from "@/components/Review";
import { useAuth } from "@/context/AuthContext";
import { useUserLocation } from "@/context/LocationContext";
import { PropertyItemType, useProperties } from "@/hooks/useProperties";
import HomeFilters, { PropertyFilters } from "@/modules/protected/HomeFilters";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { formatter } from "@/util";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropertyItem = ({property}: {property: PropertyItemType}) => {
  const userLocation = useUserLocation();
  return (
    <Pressable style={[styles.card, globalStyles.shadowSm]} onPress={() => router.push({
      pathname: '/home/property/[property]',
      params: {property: property.id
    }})}>
      <Image source={{uri: property.logo}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{property.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{property.type}</Text>
        </View>
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

const EmptyPropertyList = () => {
  return (
    <View style={[styles.card, {padding: 16, borderColor: theme.colors.warning}]}>
      <FontAwesome6 
        name="question-circle"
        size={24}
        color={theme.colors.warning}
        style={{marginEnd: 12}} />
      <Text style={{color: theme.colors.secondary}}>
        Infelizmente, não pudemos encontrar nenhuma propriedade
        próxima a sua localização no momento
      </Text>
    </View>
  )
}

const LoadingPropertyList = () => {
  return (
    <View style={[styles.card, {marginHorizontal: 16, padding: 16, borderColor: theme.colors.primary}]}>
      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={{marginEnd: 8}}/>
      <Text style={{color: theme.colors.primary}}>
        Carregando lista de propriedades...
      </Text>
    </View>
  )
}

const PropertiesList = ({filters}: {filters?: PropertyFilters}) => {
  const { data, loading } = useProperties(filters);
  return (
    <View>
      {data.length ? (
        <View style={styles.content}>
          <Text style={styles.results}>
            Encontramos <Text style={globalStyles.extraBold}>{data.length} propriedade(s)</Text> com base nos filtros aplicados
          </Text>
        </View>
      ) : undefined}
      {! loading ? (
        <FlatList
          style={{paddingHorizontal: 16}}
          data={data}
          ListEmptyComponent={<EmptyPropertyList />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => ( <PropertyItem property={item} /> )}
        />
      ) : (
        <LoadingPropertyList />
      )}
    </View>
  )
}

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] =  useState<PropertyFilters>();
  const [userCity, setUserCity] = useState<string | null>('Rio de Janeiro');
  const { user } = useAuth();
  const userLocation = useUserLocation();

  useEffect(() => {
    if (!userLocation) return;

    (async () => {
      try {
        const [address] = await Location.reverseGeocodeAsync({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
        // endereço pode ter city, region, street, etc
        setUserCity(address.city || address.region);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={globalStyles.textBase}>
          Bem-vindo! <Text style={globalStyles.bold}>{user?.name || 'Convidado'}! {"\n"}</Text>
          {userLocation ? (
            <>
              <Text>Buscando propriedades próximas à sua localização:{" "}</Text>
              <Text style={globalStyles.bold}>{userCity}.</Text>
            </>
          ) : (
            <>
              <Text>Buscando propriedades em:{" "}</Text>
              <Text style={globalStyles.bold}>{userCity}</Text>
            </>
          )}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={[globalStyles.row, globalStyles.itemsCenter, {marginBottom: 16}]}>
          <SearchInput onSearch={(search) => setFilters((filters) => ({ ...filters, keyword: search }))} />
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
  badge: {
    backgroundColor: theme.colors.success,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 700,
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
  }
});
