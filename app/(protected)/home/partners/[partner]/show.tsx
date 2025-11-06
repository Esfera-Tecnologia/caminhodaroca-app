import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const Event = () => {
  return (
    <View style={styles.event}>
      <Text style={styles.eventName}>
        Lua Cheia na Fazenda
      </Text>
      <Text style={styles.eventDescription}>
        Pariatur tempor est incididunt reprehenderit elit
        labore ullamco non reprehenderit adipisicing elit.
        Do occaecat exercitation nostrud adipisicing id
        duis qui. Cupidatat consectetur ex enim et duis
      </Text>
      <Pressable>
        <Text style={{color: theme.colors.primary, fontWeight: 600}}>Ver detalhes do evento</Text>
      </Pressable>
    </View>
  )
}
export default function PropertyDetails() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={[globalStyles.card, {marginVertical: 20}]}>
        <View style={[globalStyles.row, globalStyles.itemsStart, globalStyles.mb3]}>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={styles.logo}
            contentFit='cover' />
          <View style={[{flexShrink: 1, alignItems: 'flex-start', paddingEnd: 16}]}>
            <Text style={styles.name} numberOfLines={2}>Fazenda Boa Vista Fazendinha Feliz Demais da conta</Text>
            <Badge 
              text="Pedra de Guaratiba • RJ"
              icon={<FontAwesome5 name="map-marker-alt" size={16} color={theme.colors.primary}/>}
              style={{marginBottom: 6}}/>
            <Badge
              text="Hospedagem Rural"
              icon={<FontAwesome5 name="tags" size={12} color={theme.colors.primary}/>}
              style={{marginBottom: 6}}/>
            <Badge 
              text="Cabana"
              icon={<FontAwesome5 name="leaf" size={12} color={theme.colors.primary}/>} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Descrição
          </Text>
          <Text style={styles.sectionDescription}>
            Lorem exercitation esse officia irure aute ea pariatur elit.
            Laborum sit excepteur laboris anim sit proident laboris id
            sit dolore dolor nulla culpa.
          </Text>
        </View>
        <Text style={styles.title}>
          Contato e Presença Digital
        </Text>
        <View style={styles.section}>
          <Button 
            variant="primary"
            outline={true}
            title="contato@fazendaboavista.com.br"
            startIcon={<Ionicons name="mail" size={14} color={theme.colors.primary} />}
            textStyle={{fontSize: 14}}
            style={{flex: 1, borderRadius: 30, marginBottom: 12}}/>
          <View style={[globalStyles.row, globalStyles.itemsCenter]}>
            <Button 
              variant="primary"
              outline={true}
              title="Instagram"
              startIcon={<FontAwesome5 name="instagram" size={14} color={theme.colors.primary} />}
              textStyle={{fontSize: 14}}
              style={{flex: 1, borderRadius: 30, marginEnd: 8}}/>
            <Button
              variant="primary"
              outline={true}
              title="Site oficial"
              startIcon={<MaterialCommunityIcons name="web" size={14} color={theme.colors.primary} />}
              textStyle={{fontSize: 14}}
              style={{flex: 1, borderRadius: 30}}/>
          </View>
        </View>
        <Text style={styles.title}>
          Localização e Segmentação
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Município</Text>
          <Text style={{marginBottom: 8}}>Rio de Janeiro</Text>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <Text style={{marginBottom: 8}}>Hospedagem</Text>
          <Text style={styles.sectionTitle}>Subcategoria</Text>
          <Text>Cabana</Text>
        </View>
        <Text style={styles.title}>
          Experiencias Oferecidas
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rotas</Text>
          <Text style={{marginBottom: 8}}>
            Ipsum mollit esse nostrud exercitation irure consequat.
            Incididunt irure adipisicing eu mollit id consequat cillum
            cupidatat adipisicing consequat.
          </Text>
          <Text style={styles.sectionTitle}>Circuitos</Text>
          <Text style={{marginBottom: 8}}>
            Ipsum mollit esse nostrud exercitation irure consequat.
            Incididunt irure adipisicing eu mollit id consequat cillum
            cupidatat adipisicing consequat.
          </Text>
          <Text style={styles.sectionTitle}>Atrativos</Text>
          <Text>
            Ipsum mollit esse nostrud exercitation irure consequat.
            Incididunt irure adipisicing eu mollit id consequat cillum
            cupidatat adipisicing consequat.
          </Text>
        </View>
        <Text style={styles.title}>
          Eventos
        </Text>
        <Event />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  logo: {
    borderRadius: 16,
    width: 76,
    height: 76,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    marginEnd: 12,
    marginTop: 6
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
    padding: 16,
    marginBottom: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 10,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.06)'
    }]
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
    marginBottom: 16
  },
});
