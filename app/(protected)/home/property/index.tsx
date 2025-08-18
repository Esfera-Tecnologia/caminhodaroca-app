import SearchInput from "@/components/controls/SearchInput";
import Review from "@/components/Review";
import HomeFilters from "@/modules/protected/HomeFilters";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PropertyItemType = {
  id: number;
  name: string;
  rating: number;
  type: string;
  location: string;
  distance: string;
  image: ImageSourcePropType | undefined;
}
const properties: PropertyItemType[] =  [
  {
    id: 1,
    name: "Fazenda Boa Vista",
    rating: 4,
    type: "Cabana",
    location: "Pedra de Guaratiba",
    distance: "12 km de distância",
    image: require("@/assets/images/farm1.png"),
  },
  {
    id: 2,
    name: "Sítio Vale Verde",
    rating: 3,
    type: "Cabana",
    location: "Vargem Grande",
    distance: "18 km de distância",
    image: require("@/assets/images/farm1.png"),
  },
  {
    id: 3,
    name: "Chácara do Sol",
    rating: 3,
    type: "Cabana",
    location: "Campo Grande",
    distance: "25 km de distância",
    image: require("@/assets/images/farm1.png"),
  },
];

const PropertyItem = ({property}: {property: PropertyItemType}) => {
  return (
    <Pressable style={styles.card} onPress={() => router.push({pathname: '/home/property/[property]', params: {property: 1}})}>
      <Image source={property.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{property.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{property.type}</Text>
        </View>
        <Review length={5} review={property.rating}/>
        <View style={[globalStyles.row, globalStyles.itemsCenter]}>
          <FontAwesome6 name="location-dot" size={12} color={theme.colors.body} style={{marginStart: 2}} />
          <Text style={[styles.details, {marginStart: 6}]}>{property.location}</Text>
        </View>
        <View style={[globalStyles.row, globalStyles.itemsCenter]}>
          <FontAwesome6 name="route" size={12} color={theme.colors.body} />
          <Text style={styles.details}>{property.distance}</Text>
        </View>
      </View>
      <FontAwesome6 name="chevron-right" size={16} color={theme.colors.secondary} style={{marginEnd: 12}} />
    </Pressable>
  )
}

const PropertiesList = () => {
  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      data={properties}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => ( <PropertyItem property={item} /> )}
    />
  )
}

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={globalStyles.textBase}>
          Bem-vindo! <Text style={globalStyles.bold}>Denys Rodrigues! {"\n"}</Text>
          Encontramos propriedades próximas à sua localização:{" "}
          <Text style={globalStyles.bold}>Rio de Janeiro.</Text>
        </Text>
      </View>
      <View style={styles.content}>
        <View style={[globalStyles.row, globalStyles.itemsCenter, {marginBottom: 16}]}>
          <SearchInput />
          <TouchableOpacity style={styles.filters} onPress={() => setIsFiltersOpen(true)}>
            <Ionicons name="options-outline" size={22} color="#00796B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.results}>
          Encontramos <Text style={globalStyles.extraBold}>3 propriedades</Text> próximas da sua localização.
        </Text>
      </View>
      <PropertiesList />
      <HomeFilters 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)} 
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
    elevation: 2,
  },
  image: { 
    width: 120,
    height: 120,
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
