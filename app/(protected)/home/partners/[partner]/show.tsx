import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import RecordLoading from '@/components/RecordLoading';
import RecordNotFound from '@/components/RecordNotFound';
import env from "@/config.json";
import { EventType, PartnerType } from '@/interfaces';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { openEmail, openInstagram, openLink, truncatedJoinedCities } from '@/util';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';



const Event = ({event}: {event: EventType}) => {
  return (
    <View style={styles.event}>
      {event.images.length > 0 && (
        <Image source={{uri: event.images[0]}} style={styles.eventLogo}/>
      )}
      <View style={{padding: 16}}>
        {event.name && (
          <Text style={styles.eventName}>
            {event.name}
          </Text>
        )}
        <Text style={styles.eventDescription}>
          {event.description}
        </Text>
        {event.externalLink && (
          <Pressable onPress={() => openLink(event.externalLink || '')} style={{marginTop: 16}}>
            <Text style={{color: theme.colors.primary, fontWeight: 600}}>Ver detalhes do evento</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}
export default function PropertyDetails() {
  const { partner: partnerId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<PartnerType | null>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/partners/${partnerId}`);
        setPartner(response.data);
      } catch (error) {
        console.log('Erro ao buscar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [partnerId]);

  if (loading) {
    return <RecordLoading />;
  }
  if (!partner) {
    return <RecordNotFound />;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={[globalStyles.card, {marginVertical: 20}]}>
        <View style={[globalStyles.row, globalStyles.itemsStart, globalStyles.mb3]}>
          <Logo source={{uri: partner.logo}}/>
          <View style={[{flexShrink: 1, alignItems: 'flex-start', paddingEnd: 16}]}>
            <Text style={styles.name} numberOfLines={2}>{partner.name}</Text>
            <Badge 
              text={truncatedJoinedCities(partner.cities, 'RJ')}
              icon={<FontAwesome5 name="map-marker-alt" size={16} color={theme.colors.primary}/>}
              style={{marginBottom: 6}}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Descrição
          </Text>
          <Text style={styles.sectionDescription}>
            {partner.description}
          </Text>
        </View>
        <Text style={styles.title}>
          Contato e Presença Digital
        </Text>
        <View style={styles.section}>
          <Button
            onPress={() => openEmail(partner.email, 'Caminho da Roça')}
            variant="primary"
            outline={true}
            title={partner.email}
            startIcon={<Ionicons name="mail" size={14} color={theme.colors.primary} />}
            textStyle={{fontSize: 14}}
            style={{flex: 1, borderRadius: 30, marginBottom: 12}}/>
          <View style={[globalStyles.row, globalStyles.itemsCenter]}>
            <Button
              onPress={() => openInstagram(partner.instagram)}
              variant={partner.instagram ? 'primary' : 'disabled'}
              outline={!! partner.instagram}
              title="Instagram"
              startIcon={
                <FontAwesome5
                  color={partner.instagram ? theme.colors.primary : '#888'}
                  name="instagram"
                  size={14} />
              }
              textStyle={{fontSize: 14}}
              style={{flex: 0.5, borderRadius: 30, marginEnd: 8}}/>
            <Button
              onPress={() => openLink(partner.website)}
               variant={partner.website ? 'primary' : 'disabled'}
              outline={!! partner.website}
              title="Site oficial"
              startIcon={
                <MaterialCommunityIcons
                  color={partner.website ? theme.colors.primary : '#888'}
                  name="web"
                  size={14} />
              }
              textStyle={{fontSize: 14}}
              style={{flex: 0.5, borderRadius: 30}}/>
          </View>
        </View>
        <Text style={styles.title}>
          Localização
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Município</Text>
          <Text style={{marginBottom: 8}}>{Object.values(partner.cities).join(', ')}</Text>
        </View>
        <Text style={styles.title}>
          Experiencias Oferecidas
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rotas</Text>
          <Text style={{marginBottom: 8}}>
            {partner.routes}
          </Text>
          <Text style={styles.sectionTitle}>Circuitos</Text>
          <Text style={{marginBottom: 8}}>
            {partner.circuits}
          </Text>
          <Text style={styles.sectionTitle}>Atrativos</Text>
          <Text>
            {partner.attractions}
          </Text>
        </View>
        {partner.events && partner.events.length > 0 && (
          <>
            <Text style={styles.title}>
              Eventos
            </Text>
            {partner.events.map(event => (
              <Event key={event.id} event={event}/>)
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  name: {
    fontSize: 21,
    fontWeight: 600,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  section: {
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.colors.body
  },
  event: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginBottom: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 10,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.06)'
    }]
  },
  eventLogo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 16,
    color: "#555",
  },
});
