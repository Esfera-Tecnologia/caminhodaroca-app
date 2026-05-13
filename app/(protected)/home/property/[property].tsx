import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import { ExpandableText } from '@/components/ExpandableText';
import FavoriteListsModal from '@/components/FavoriteListsModal';
import ImageGallery from '@/components/ImageGallery';
import Logo from '@/components/Logo';
import { QRCodeScanner } from '@/components/QRCodeReader';
import Rating from '@/components/Rating';
import RecordLoading from '@/components/RecordLoading';
import RecordNotFound from '@/components/RecordNotFound';
import Review from '@/components/Review';
import env from "@/config.json";
import { useAuth } from '@/context/AuthContext';
import { useUserLocation } from '@/context/LocationContext';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { formatter, getDistanceInKm, openInstagram, openLink, openWhatsapp, truncatedJoinedCities } from '@/util';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { router } from 'expo-router';
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

interface Partner {
  id: number;
  name: string;
  logo: string;
  cities: string[];
  state: string;
}

interface Property {
  id: number;
  name: string;
  logo: string;
  rating: number;
  user_rating: number;
  favorite_count: number;
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
  relatedPartners: Partner[];
  favorite_list_ids?: number[];
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

const PartnerCarouselItem = ({partner}: {partner: Partner}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={[styles.partner]}>
        <Logo source={{uri: partner.logo}}/>
        <Text numberOfLines={2} style={styles.partnerName}>{partner.name}</Text>
        <Text style={[styles.partnerDetails, {marginBottom: 8}]}>
          {truncatedJoinedCities(partner.cities, partner.state)}
        </Text>
        <Button
          onPress={() => router.push({
            pathname: '/home/partners/[partner]/show',
            params: {partner: partner.id}
          })}
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
  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);
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
        setProperty(data);
      } catch (error) {
        console.log('Erro ao buscar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleOpenFavoriteModal = () => {
    if (!user) {
      Toast.warn("Para acessar essa funcionalidade, você precisa estar logado.");
      return;
    }
    setFavoriteModalVisible(true);
  };

  const handleQRCodeReaderModal = () => {
    if (!user) {
      Toast.warn("Para acessar essa funcionalidade, você precisa estar logado.");
      return;
    }
    async function getLocationPermissions() {
      let { granted } = await Location.requestForegroundPermissionsAsync();
      if (! granted ) {
        Toast.error('Para acessar essa funcionalidade, você precisa fornecer acesso a localização do dispositivo');
        return false;
      }
      return true;
    }
    async function getCameraPermissions() {
      let { granted } = await Camera.requestCameraPermissionsAsync();
      if (! granted) {
        Toast.error('Para acessar essa funcionalidade, você precisa fornecer acesso a câmera do dispositivo');
        return false;
      }
      return true;
    }
    async function checkPermissions() {
      if(await getCameraPermissions() && await getLocationPermissions()) {
        setQRCodeModalVisible(true);
      }
    }
    checkPermissions();
  }

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
        {property.isFavorited && (
          <View style={styles.favoriteBadge}>
            <FontAwesome name="heart" size={16} color="#e25563" />
          </View>
        )}
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
        <View style={[globalStyles.row, { marginBottom: 8, gap: 8}]}>
          <Button 
            variant="success"
            outline={true}
            title="Ver no mapa"
            style={{ flex: 1 }}
            onPress={() => openLink(property.link_google_maps)} 
            startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.success} />}
          />
          <Button 
            variant="success"
            outline={true}
            title="Ler QR Code"
            style={{ flex: 1 }}
            onPress={handleQRCodeReaderModal} 
            startIcon={<FontAwesome6 name="qrcode" size={16} color={theme.colors.success} />}
          />
        </View>
        <View style={[globalStyles.row, { marginBottom: 8, gap: 8 }]}>
          <Button 
            variant="instagram"
            outline={true}
            title="Instagram"
            style={{ flex: 1 }}
            onPress={() => openInstagram(property.instagram)} 
            startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.instagram} />}
          />
          <Button
            onPress={() => openWhatsapp(property.phone, 'Olá, eu venho através do app Caminho da Roça!')}
            variant="success"
            outline={true}
            style={{ flex: 1}}
            title="Contato"
            startIcon={<FontAwesome6 name="whatsapp" size={16} color={theme.colors.success}/>} />
        </View>
        <Button
          variant="secondary"
          outline={true}
          style={{width: '100%',  margin: 0}}
          title={`Salvar em listas (${property.favorite_list_ids?.length ?? property.favorite_count})`}
          onPress={handleOpenFavoriteModal}
        />
        {property.relatedPartners.length ? (
          <View style={{marginBottom: 36, marginTop: 16}}>
            <Text style={[styles.sectionTitle, {marginBottom: -4}]}>Parceiros Relacionados</Text>
            <Carousel
              data={property.relatedPartners.map(partner => (
                { id: partner.id, render: () => <PartnerCarouselItem partner={partner} /> }
              ))}
              autoPlay
              autoPlayInterval={3000} />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Rating
        initialUserRating={property.user_rating}
        onSuccess={(averageRating, userRating) =>  setProperty({
          ...property,
          rating: averageRating,
          user_rating: userRating
        })}
        propertyId={property.id} />
      <FavoriteListsModal
        visible={favoriteModalVisible}
        propertyId={property.id}
        initialSelectedListIds={property.favorite_list_ids || []}
        onClose={() => setFavoriteModalVisible(false)}
        onUpdateListIds={(newIds) => setProperty({ ...property, favorite_list_ids: newIds, favorite_count: newIds.length })}
      />
      <QRCodeScanner
        storing={false}
        onSuccess={(code) => console.log(code)}
        visible={qrCodeModalVisible}
        toggleModalVisibility={(visible) =>
          setQRCodeModalVisible(visible)
        }/> 
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
    textAlign: 'center',
    color: '#6c757d',
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
});
