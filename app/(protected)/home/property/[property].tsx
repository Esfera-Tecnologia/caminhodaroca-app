import Button from '@/components/Button';
import Review from '@/components/Review';
import env from "@/config.json";
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import axios from 'axios';
import * as Clipboard from "expo-clipboard";
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';

const propertyBackground = require('@/assets/images/property.jpg');

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
  openingHours: {
    weekdays: string;
    weekend: string;
  };
  products: string;
  accessibility: string;
  petPolicy: string;
  gallery: string[];
}


const contactProperty = async (phone: string, message?: string) => {
  const formattedPhone = phone.replace(/\D/g, ''); // só dígitos
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


export default function PropertyDetails() {
  const { property: propertyId } = useLocalSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/properties/${propertyId}`);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          source={property.gallery[0] ? { uri: property.gallery[0] } : propertyBackground}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Image source={{ uri: property.logo }} style={styles.logo} contentFit="cover" />
            <View>
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
          <View style={[styles.infoRow, {marginBottom: 8}]}>
            <FontAwesome6 name="route" size={12} color={theme.colors.secondary} />
            <Text style={[styles.infoText]}>
              12 km de distância
            </Text>
          </View>
          <Text style={styles.label}>
            Categoria: <Text style={styles.value}>{property.category}</Text>
          </Text>
          <Text style={[styles.label, {marginBottom: 8}]}>
            Subcategoria: <Text style={styles.value}>{property.subcategory}</Text>
          </Text>
          <Text style={[globalStyles.textBase, styles.description]}>
            {property.description}
          </Text>

          <Text style={styles.sectionTitle}>Horários de Funcionamento</Text>
          <View style={styles.box}>
            <Text>Segunda a Sexta: {property.openingHours.weekdays}</Text>
            <Text>Sábado e Domingo: {property.openingHours.weekend}</Text>
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
          <ScrollView horizontal contentContainerStyle={{paddingBottom: 8}} style={{marginBottom: 24}}>
            {property.gallery.map((img, i) => (
              <View key={i} style={styles.previewContainer}>
                <Image source={{ uri: img }} style={styles.preview} />
              </View>
            ))}
          </ScrollView>

          <Button 
            variant="success"
            outline={true}
            title="Ver no mapa"
            style={{marginBottom: 12}}
            startIcon={<FontAwesome6 name="map-location-dot" size={16} color={theme.colors.success} />} />
          <View style={globalStyles.row}>
            <Button
              onPress={() => contactProperty(property.phone, 'Olá, eu venho através do app Caminho da Roça!')}
              variant="success"
              outline={true}
              style={{marginEnd: 8, flex: 1}}
              title="Contato"
              startIcon={<FontAwesome6 name="whatsapp" size={16} color={theme.colors.success}/>} />
            <Button 
              variant="secondary"
              outline={true}
              style={{flex: 1}}
              title="Favoritar"
              startIcon={<Foundation name="heart" size={16} color={theme.colors.secondary} />}  />
          </View>
        </View>
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
  card: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: -60,
    borderRadius: 20,
    padding: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 12,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.15)'
    }]
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
  previewContainer: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#dee2e6",
    boxShadow: [{
      offsetX: 0,
      offsetY: 2,
      blurRadius: 6,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.1)'
    }],
    borderRadius: 10,
    marginEnd: 16,
  },
  preview: {
    height: 100,
    width: 130,
    borderRadius: 10,
  }
});
