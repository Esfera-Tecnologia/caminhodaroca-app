import Button from '@/components/Button';
import Review from '@/components/Review';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { FontAwesome6, Foundation } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const propertyBackground = require('@/assets/images/property.jpg');
const propertyLogo = require("@/assets/images/farm1.png");

export default function PropertyDetails() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          source={propertyBackground}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Image source={propertyLogo} style={styles.logo} contentFit="cover" />
            <View>
              <Text style={styles.propertyName}>Fazenda Boa Vista</Text>
              <Review length={5} review={3}/>
            </View>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome6 name="location-dot" size={12} color={theme.colors.secondary} style={{marginStart: 2}} />
            <Text style={[styles.infoText, {marginStart: 6}]}>
              Pedra de Guaratiba, Rio de Janeiro
            </Text>
          </View>
          <View style={[styles.infoRow, {marginBottom: 8}]}>
            <FontAwesome6 name="route" size={12} color={theme.colors.secondary} />
            <Text style={[styles.infoText]}>
              12 km de distância
            </Text>
          </View>
          <Text style={styles.label}>
            Categoria: <Text style={styles.value}>Hospedagem Rural</Text>
          </Text>
          <Text style={[styles.label, {marginBottom: 8}]}>
            Subcategoria: <Text style={styles.value}>Cabana</Text>
          </Text>
          <Text style={[globalStyles.textBase, styles.description]}>
            A Fazenda Boa Vista oferece uma experiência autêntica no campo, com acomodações
            rústicas, gastronomia local e belas paisagens naturais.
          </Text>
          <Text style={[styles.sectionTitle]}>Horários de Funcionamento</Text>
          <View style={styles.box}>
            <Text>Segunda a Sexta: 08:00 às 18:00</Text>
            <Text>Sábado e Domingo: 09:00 às 17:00</Text>
          </View>
          <Text style={[styles.sectionTitle]}>Produtos Disponíveis</Text>
          <View style={styles.box}>
            <Text>Queijos artesanais, doces caseiros, ovos caipiras, hortaliças orgânicas.</Text>
          </View>
          <Text style={[styles.sectionTitle]}>Acessibilidade</Text>
          <View style={styles.box}>
            <Text>Acesso para cadeirantes, estacionamento disponível.</Text>
          </View>
          <Text style={[styles.sectionTitle]}>Política Pet Friendly</Text>
          <View style={styles.box}>
            <Text>Nosso estabelecimento permite a entrada de animais de estimação</Text>
          </View>
          <Text style={[styles.sectionTitle]}>Galeria de Fotos</Text>
          <ScrollView horizontal contentContainerStyle={{paddingBottom: 8}} style={{marginBottom: 24}}>
            {Array(5).fill(null).map((_, i) => (
              <View key={i} style={styles.previewContainer}>
                <Image source={propertyBackground} style={styles.preview} />
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
