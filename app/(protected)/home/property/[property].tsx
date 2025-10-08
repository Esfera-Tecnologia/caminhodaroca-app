import Button from '@/components/Button';
import ImageGallery from '@/components/ImageGallery';
import Rating from '@/components/Rating';
import Review from '@/components/Review';
import env from "@/config.json";
import { useAuth } from '@/context/AuthContext';
import { useUserLocation } from '@/context/LocationContext';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { formatter, getDistanceInKm } from '@/util';
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import axios from 'axios';
import * as Clipboard from "expo-clipboard";
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';

const daysMap: Record<string, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

interface OpeningHourDay {
  open: string | null;
  close: string | null;
  lunchBreak: boolean;
}

interface OpeningHours {
  monday: OpeningHourDay;
  tuesday: OpeningHourDay;
  wednesday: OpeningHourDay;
  thursday: OpeningHourDay;
  friday: OpeningHourDay;
  saturday: OpeningHourDay;
  sunday: OpeningHourDay;
  custom?: string | null;
}

interface Property {
  id: number;
  name: string;
  logo: string;
  rating: number;
  type: string;
  phone: string;
  location: {
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  category: string;
  subcategory: string;
  openingHours: OpeningHours;
  products: string;
  accessibility: string;
  petPolicy: string;
  gallery: string[];
  link_google_maps: string;
  isFavorited: boolean;
  instagram: string;
}

const contactProperty = async (phone: string, message?: string) => {
  const formattedPhone = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  const telUrl = `tel:${formattedPhone}`;

  try {
    await Linking.openURL(whatsappUrl);
  } catch {
    try {
      await Linking.openURL(telUrl);
    } catch {
      await Clipboard.setStringAsync(formattedPhone);
      Toast.info("Número copiado para a área de transferência");
    }
  }
};

const openInstagram = async (input?: string | null) => {
  if (!input || typeof input !== "string") {
    Toast.warn("A propriedade não cadastrou o Instagram.");
    return;
  }
  const username = input
    .trim()
    .replace(/^@/, "")
    .replace(/https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/\/.*/, "");
  if (!username) {
    Toast.error("Parece que houve um problema com o link do Instagram.");
    return;
  }
  const appUrl = `instagram://user?username=${username}`;
  const webUrl = `https://www.instagram.com/${username}`;
  try {
    await Linking.openURL(appUrl);
  } catch {
    try {
      await Linking.openURL(webUrl);
    } catch {
      Toast.error("Não foi possível abrir o perfil do Instagram da propriedade.");
    }
  }
};

const openGoogleMapsLink = (url: string) => {
  Linking.openURL(url).catch(err => {
    Toast.error('Não foi possível abrir o link do Google Maps.');
  });
};

function OpeningDays({openingHours}: {openingHours: OpeningHours}) {
  if(openingHours.custom) {
    return <Text>{openingHours.custom}</Text>
  }
  const days = Object.entries(openingHours)
    .filter(([key]) => key !== "custom")
    .map(([day, value]) => {
      const v = value as OpeningHourDay;
      if (!v.open || !v.close) return null;
      return {
        day: day,
        open: v.open,
        close: v.close,
      };
    })
    .filter(Boolean) as { day: string; open: string; close: string }[];

  if (days.length === 0) {
    return <Text>Horários não informados</Text>;
  }
  return (
    <>
      {days.map(({ day, open, close }, index) => (
        <View style={styles.openingDay} key={index}>
          <Text style={{fontSize: 13}}>
            {daysMap[day] || day}: {open} - {close}
          </Text>
          {(openingHours[day as Exclude<keyof OpeningHours, "custom">]?.lunchBreak) && (
            <Text style={{ fontSize: 10, color: theme.colors.danger }}>
              Fecha para almoço
            </Text>
          )}
        </View>
      ))}
    </>
  );
}

function ExpandableText({ text, numberOfLines = 3}: { text: string; numberOfLines?: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <View>
      <Text 
        style={styles.value}
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={(e) => {
          if (!expanded) {
            setShowExpandButton(e.nativeEvent.lines.length > numberOfLines);
          }
      }}>{text}</Text>
      {showExpandButton && (
        <Pressable onPress={toggleExpanded}>
          <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>
            {expanded ? "Mostrar menos" : "Mostrar mais"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default function PropertyDetails() {
  const {location: userLocation} = useUserLocation();
  const { property: propertyId } = useLocalSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [wasFavorited, setWasFavorited] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/properties/${propertyId}`);
        setWasFavorited(response.data.isFavorited);
        setProperty(response.data);
      } catch (error) {
        console.log('Erro ao buscar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Propriedade não encontrada</Text>
      </SafeAreaView>
    );
  }

  const toggleFavorite = async (propertyId: number) => {
    if(! user) {
      Toast.warn("Para acessar essa funcionalidade, você precisa estar logado.");
      return null;
    }
    try {
      const response = await axios.post(`${env.API_URL}/properties/${propertyId}/favorite`);
      setWasFavorited(!wasFavorited);
      Toast.success(response.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Toast.error("Usuário não autenticado");
        } else if (error.response?.status === 404) {
          Toast.error("Propriedade não encontrada");
        } else {
          Toast.error("Erro ao alternar favorito");
        }
      }
      return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          source={property.gallery[0] ? { uri: property.gallery[0] } : undefined}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={[globalStyles.card, {marginBottom: 16, marginTop: -60}]}>
          <View style={styles.titleRow}>
            <Image source={{ uri: property.logo }} style={styles.logo} contentFit="cover" />
            <View style={{flexShrink: 1}}>
              <Text style={styles.propertyName}>{property.name}</Text>
              <Review length={5} review={property.rating} />
            </View>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome6 name="location-dot" size={12} color={theme.colors.secondary} style={{marginStart: 2}} />
            <Text style={[styles.infoText, {marginStart: 6}]}>
              {property.location.city}, {property.location.state}
            </Text>
          </View>
          {userLocation && (
            <View style={[styles.infoRow, {marginBottom: 8}]}>
                <FontAwesome6 name="route" size={12} color={theme.colors.secondary} />
                <Text style={[styles.infoText]}>
                  {formatter.format(getDistanceInKm(
                    property.location.coordinates.lat,
                    property.location.coordinates.lng,
                    userLocation.latitude,
                    userLocation.longitude
                  ))} km de distância
              </Text>
            </View>
            )}
          <Text style={styles.label}>
            <ExpandableText text={'Categoria: ' + property.category} />
          </Text>
          <Text style={[styles.label, {marginBottom: 8}]}>
            <ExpandableText text={'Subcategoria: ' + property.subcategory} />
          </Text>
          <Text style={[globalStyles.textBase, styles.description]}>
            {property.description}
          </Text>
          <Text style={styles.sectionTitle}>Horários de Funcionamento</Text>
          <View style={styles.box}>
            <OpeningDays openingHours={property.openingHours} />
          </View>
          <Text style={styles.sectionTitle}>Produtos Disponíveis</Text>
          <View style={styles.box}>
            <Text>{property.products}</Text>
          </View>
          <Text style={styles.sectionTitle}>Acessibilidade</Text>
          <View style={styles.box}>
            <Text>{property.accessibility}</Text>
          </View>
          <Text style={styles.sectionTitle}>Política Pet Friendly</Text>
          <View style={styles.box}>
            <Text>{property.petPolicy}</Text>
          </View>
          <Text style={styles.sectionTitle}>Galeria de Fotos</Text>
          <ImageGallery property={property} />
          <View style={[globalStyles.row, { marginBottom: 8 }]}>
            <Button 
              variant="secondary"
              outline={true}
              title="Ver no mapa"
              style={{ width: '50%', marginEnd: 8 }}
              onPress={() => openGoogleMapsLink(property.link_google_maps)} 
              startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.secondary} />}
            />
            {wasFavorited ? (
              <Button 
                variant="success"
                style={{width: '50%'}}
                title= "Desfavoritar"
                startIcon={<Foundation name="heart" size={16} color={"#fff"} />}
                onPress={() => toggleFavorite(property.id)}  />
            ) : (
              <Button 
                variant="secondary"
                outline={true}
                style={{width: '50%'}}
                title="Favoritar"
                startIcon={<Foundation name="heart" size={16} color={theme.colors.secondary} />}
                onPress={() => toggleFavorite(property.id)}  />
            )}
          </View>
          <View style={[globalStyles.row]}>
            <Button 
              variant="instagram"
              outline={true}
              title="Instagram"
              style={{ width: '50%', marginEnd: 8 }}
              onPress={() => openInstagram(property.instagram)} 
              startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.instagram} />}
            />
            <Button
              onPress={() => contactProperty(property.phone, 'Olá, eu venho através do app Caminho da Roça!')}
              variant="success"
              outline={true}
              style={{width: '50%' }}
              title="Contato"
              startIcon={<FontAwesome6 name="whatsapp" size={16} color={theme.colors.success}/>} />
          </View>
        </View>
        <Rating
          initialUserRating={property.rating}
          onSuccess={(averageRating) =>  setProperty({...property, rating: averageRating})} 
          propertyId={property.id} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  headerImage: {
    width: '100%',
    height: 180
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    marginEnd: 16,
  },
  propertyName: {
    fontSize: 18,
    color: "#212529",
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  infoText: {
    marginLeft: 4,
    color: theme.colors.secondary
  },
  label: {
    marginBottom: 4,
  },
  value: {
    fontWeight: 700,
  },
  description: {
    marginBottom: 20,
    color: theme.colors.secondary
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold'
  },
  box: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  
  openingDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2
  }
});
