import Review from "@/components/Review";
import { useUserLocation } from "@/context/LocationContext";
import { PropertyItemType, useProperties } from "@/hooks/useProperties";
import { theme } from "@/theme";
import { formatter, getDistanceInKm } from "@/util";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const { width, height } = Dimensions.get("window");

export default function Maps() {
  const { data: properties } = useProperties(undefined);
  const userLocation = useUserLocation();
  const [selected, setSelected] = useState<PropertyItemType | null>(null);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.9068,
          longitude: -43.1729,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            onPress={() => setSelected(property)} 
            coordinate={{
              latitude: Number(property.location.coordinates.lat),
              longitude: Number(property.location.coordinates.lng),
            }}
          />
        ))}
      </MapView>
      {selected && (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Pressable onPress={() => setSelected(null)} style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
              <FontAwesome6 name="xmark" size={22} color={theme.colors.secondary} />
            </Pressable>
            <Pressable onPress={() => setSelected(null)} style={{alignItems: 'center'}}>
              <Image source={selected.logo} style={styles.image}/>
              <Text style={styles.title}>{selected.name}</Text>
              <Review length={5} review={selected.rating} />
              <View style={styles.row}>
                <FontAwesome6 name="location-dot" size={11} color={theme.colors.secondary}/>
                <Text style={styles.subtitle}>{selected.location.city}</Text>
              </View>
              <View style={styles.row}>
                <FontAwesome6 name="route" size={11} color={theme.colors.secondary} />
                {userLocation && (
                  <Text style={styles.subtitle}>
                    {formatter.format(getDistanceInKm(
                      selected.location.coordinates.lat,
                      selected.location.coordinates.lng,
                      userLocation.latitude,
                      userLocation.longitude
                    ))} km
                  </Text>
                )}
              </View>
            </Pressable>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({pathname: `/home/property/[property]`, params: { property: String(selected.id) }})}
            >
              <Text style={styles.buttonText}>Visualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    position: "absolute",
    bottom: 40,
    left: width / 2 - 125,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    width: 250,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    color: '#006D60',
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    alignItems: 'center',
    marginStart: 4
  },
  button: {
    width: '100%',
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00897B",
  },
  buttonText: {
    color: "#00897B",
    fontWeight: "600"
  },
});