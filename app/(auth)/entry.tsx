import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EntryScreen() {
  return (
    <AuthContainer title="Como deseja entrar?" logoMargin={25}>
      <Card>
        <Text style={styles.cardTitle}>
          Sou turista e quero viver experiências rurais
        </Text>
        <Text style={styles.cardDescription}>
          Descubra destinos, vivências, produtos e roteiros perto de você.
        </Text>
        <View style={[styles.cardLoginMethod]}>
          <View style={styles.cardLoginBody}>
            <LinearGradient
              colors={['#eef7f4', '#e6f3ef']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardLoginIcon}
            >
              <FontAwesome5 name="store" size={18} color="#287a6d" />
            </LinearGradient>
            <View style={styles.cardLoginContent}>
              <Text style={styles.cardLoginTitle}>
                Divulgue seu negócio
              </Text>
              <Text style={styles.cardLoginDescription}>
                Cadastre sua propriedade, produtos artesanais, serviço, agência de viagem, serviços etc.
              </Text>
            </View>
          </View>
          <View style={styles.cardLoginFooter}>
            <LinearGradient
              colors={['#eef7f4', '#e6f3ef']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardLoginIcon}
            >
              <FontAwesome6 name="arrow-right" size={16} color="#287a6d" />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.cardLoginMethod}>
          <View style={styles.cardLoginBody}>
            <LinearGradient
              colors={['#eef7f4', '#e6f3ef']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardLoginIcon}
            >
              <FontAwesome6 name="building-columns" size={18} color="#287a6d" />
            </LinearGradient>
            <View style={styles.cardLoginContent}>
              <Text style={styles.cardLoginTitle}>
                Sou uma instituição e quero apoiar o turismo da minha região
              </Text>
              <Text style={styles.cardLoginDescription}>
                Cadastre atividades e programações do município na sua região (secretarias de turismo, associações, consórcios regionais etc.)
              </Text>
            </View>
          </View>
          <View style={styles.cardLoginFooter}>
            <LinearGradient
              colors={['#eef7f4', '#e6f3ef']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardLoginIcon}
            >
              <FontAwesome6 name="arrow-right" size={16} color="#287a6d" />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.cardActions}>
          <Pressable style={({pressed}) => [pressed && styles.pressedPrimary, styles.button, styles.buttonPrimary]} onPress={() => router.push('/login')}>
            <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Entrar</Text>
          </Pressable>
          <Pressable style={({pressed}) => [pressed && styles.pressedAlt, styles.button, styles.buttonAlt]} onPress={() => router.push('/register')}>
            <Text style={[styles.buttonText, styles.buttonAltText]}>Criar conta</Text>
          </Pressable>
          <Pressable style={({pressed}) => [pressed && styles.pressedLink, styles.button, styles.buttonLink]} onPress={() => router.push('/login')}>
            <Text style={[styles.buttonText, styles.buttonLinkText]}>Continuar sem login</Text>
          </Pressable>
        </View>
      </Card>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 14,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonPrimary: {
    backgroundColor: "#287a6d",
  },
  buttonPrimaryText: {
    color: '#fff',
  },
  buttonAlt: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#cfe1db'
  },
  buttonAltText: {
    color: '#287a6d'
  },
  buttonLink: {
    minHeight: 0,
    paddingTop: 6,
    paddingHorizontal: 6,
    paddingBottom: 0, 
  },
  buttonLinkText: {
    color: '#1f645a'
  },
  pressedPrimary: {
    backgroundColor: '#62B55A',
  },
  pressedAlt: {
    backgroundColor: '#e9f5f2',
  },
  pressedLink: {
    backgroundColor: '#e9f5f2',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "rgb(33, 64, 58)",
    textAlign: 'left',
    marginBottom: 10,
    letterSpacing: -1,
  },
  cardDescription: {
    fontSize: 15,
    fontWeight: 400,
    color: "#6a817b",
    textAlign: 'left',
    marginBottom: 20,
  },
  cardLoginMethod: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
    borderWidth: 1,
    borderColor: '#dce8e3',
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 16,
    textAlign: 'left',
    backgroundColor: '#ffffff',
    marginBottom: 14,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 12,
        spreadDistance: 0,
        color: 'rgba(23, 63, 56, 0.05)',
      },
    ],
  },
  cardLoginBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
    flex: 1,
  },
  cardLoginFooter: {
    alignItems: 'flex-end',
  },
  cardLoginContent: {
    flex: 1,
    minWidth: 0,
  },
  cardLoginTitle: {
    fontSize: 15,
    color: '#21403a',
    fontWeight: 700,
    flexShrink: 1,
  },
  cardLoginDescription: {
    fontSize: 14,
    color: '#6a817b',
    fontWeight: 400,
    flexShrink: 1,
  },
  cardLoginIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})
