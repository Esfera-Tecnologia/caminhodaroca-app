import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import { ExpandableText } from '@/components/ExpandableText';
import ImageGallery from '@/components/ImageGallery';
import Logo from '@/components/Logo';
import Rating from '@/components/Rating';
import RecordLoading from '@/components/RecordLoading';
import RecordNotFound from '@/components/RecordNotFound';
import Review from '@/components/Review';
import env from "@/config.json";
import { useAuth } from '@/context/AuthContext';
import { useUserLocation } from '@/context/LocationContext';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { formatter, getDistanceInKm, openInstagram, openLink, openWhatsapp } from '@/util';
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import axios from 'axios';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
  user_rating: number;
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

const PartnerCarouselItem = ({id}: {id: number}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={[styles.partner]}>
        <Logo source={{uri: 'https://picsum.photos/200/300'}}/>
        <Text numberOfLines={2} style={styles.partnerName}>Sitio Vale Verde</Text>
        <Text style={styles.partnerDetails}>Vargem verde</Text>
        <Text style={styles.partnerDetails}>Hospedagem</Text>
        <Text style={[styles.partnerDetails, {marginBottom: 8}]}>Cabana</Text>
        <Button
          variant="primary"
          outline={true}
          size={'sm'}
          title="Ver parceiro" />
      </View>
    </View>
  )
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
        const data = response.data;
        if (data.gallery?.length > 0) {
          await Promise.allSettled(
            data.gallery.map((uri: string) => Image.prefetch(uri))
          );
        }
        if (data.logo) {
          await Image.prefetch(data.logo);
        }
        setWasFavorited(data.isFavorited);
        setProperty(data);
      } catch (error) {
        console.log('Erro ao buscar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

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

  if (loading) {
    return <RecordLoading />;
  }
  if (!property) {
    return <RecordNotFound />;
  }
  return (
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
            onPress={() => openLink(property.link_google_maps)} 
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
        <View style={[globalStyles.row, {marginBottom: 36}]}>
          <Button 
            variant="instagram"
            outline={true}
            title="Instagram"
            style={{ width: '50%', marginEnd: 8 }}
            onPress={() => openInstagram(property.instagram)} 
            startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.instagram} />}
          />
          <Button
            onPress={() => openWhatsapp(property.phone, 'Olá, eu venho através do app Caminho da Roça!')}
            variant="success"
            outline={true}
            style={{width: '50%' }}
            title="Contato"
            startIcon={<FontAwesome6 name="whatsapp" size={16} color={theme.colors.success}/>} />
        </View>
        <Text style={[styles.sectionTitle, {marginBottom: -4}]}>Parceiros Relacionados</Text>
        <Carousel data={[
          { id: 1, render: () => <PartnerCarouselItem id={1} /> },
          { id: 2, render: () => <PartnerCarouselItem id={2} /> },
          { id: 3, render: () => <PartnerCarouselItem id={3} /> },
        ]} autoPlay autoPlayInterval={3000} />
      </View>
      <Rating
        initialUserRating={property.user_rating}
        onSuccess={(averageRating, userRating) =>  setProperty({
          ...property,
          rating: averageRating,
          user_rating: userRating
        })}
        propertyId={property.id} />
    </ScrollView>
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
  },
  partner: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 109, 96, 0.12)',
    boxShadow: [{
      offsetX: 0,
      offsetY: 0,
      blurRadius: 18,
      spreadDistance: 0,
      color: 'rgba(0, 109, 96, 0.08)'
    }]
  },
  partnerName: {
    fontSize: 20,
    fontWeight: 500,
    color: theme.colors.primary,
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'center'
  },
  partnerDetails: {
    fontSize: 14,
    color: '#6c757d',
  }
});
