import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import { authStyles } from '@/styles/auth';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

export default function EntryScreen() {

  const openRegisterPage = async () => {
    const url = 'https://caminhodaroca.senar-rio.com.br/cadastro-propriedade-publica';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };
  return (
    <AuthContainer title="Como deseja entrar?" logoMargin={25}>
      <Card>
        <Text style={authStyles.cardTitle}>
          Sou turista e quero viver experiências rurais
        </Text>
        <Text style={authStyles.cardDescription}>
          Descubra destinos, vivências, produtos e roteiros perto de você.
        </Text>
        <Pressable onPress={() => openRegisterPage()}>
          <View style={[authStyles.cardLoginMethod]}>
            <View style={authStyles.cardLoginBody}>
              <LinearGradient
                colors={['#eef7f4', '#e6f3ef']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={authStyles.cardLoginIcon}
              >
                <FontAwesome5 name="store" size={18} color="#287a6d" />
              </LinearGradient>
              <View style={authStyles.cardLoginContent}>
                <Text style={authStyles.cardLoginTitle}>
                  Divulgue seu negócio
                </Text>
                <Text style={authStyles.cardLoginDescription}>
                  Cadastre sua propriedade, produtos artesanais, serviço, agência de viagem, serviços etc.
                </Text>
              </View>
            </View>
            <View style={authStyles.cardLoginFooter}>
              <LinearGradient
                colors={['#eef7f4', '#e6f3ef']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={authStyles.cardLoginIcon}
              >
                <FontAwesome6 name="arrow-right" size={16} color="#287a6d" />
              </LinearGradient>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/institution')}>
          <View style={authStyles.cardLoginMethod}>
            <View style={authStyles.cardLoginBody}>
              <LinearGradient
                colors={['#eef7f4', '#e6f3ef']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={authStyles.cardLoginIcon}
              >
                <FontAwesome6 name="building-columns" size={18} color="#287a6d" />
              </LinearGradient>
              <View style={authStyles.cardLoginContent}>
                <Text style={authStyles.cardLoginTitle}>
                  Sou uma instituição e quero apoiar o turismo da minha região
                </Text>
                <Text style={authStyles.cardLoginDescription}>
                  Cadastre atividades e programações do município na sua região (secretarias de turismo, associações, consórcios regionais etc.)
                </Text>
              </View>
            </View>
            <View style={authStyles.cardLoginFooter}>
              <LinearGradient
                colors={['#eef7f4', '#e6f3ef']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={authStyles.cardLoginIcon}
              >
                <FontAwesome6 name="arrow-right" size={16} color="#287a6d" />
              </LinearGradient>
            </View>
          </View>
        </Pressable>
        <View style={authStyles.cardActions}>
          <Pressable style={({pressed}) => [pressed && authStyles.pressedPrimary, authStyles.button, authStyles.buttonPrimary]} onPress={() => router.push('/login')}>
            <Text style={[authStyles.buttonText, authStyles.buttonPrimaryText]}>Entrar</Text>
          </Pressable>
          <Pressable style={({pressed}) => [pressed && authStyles.pressedAlt, authStyles.button, authStyles.buttonAlt]} onPress={() => router.push('/register')}>
            <Text style={[authStyles.buttonText, authStyles.buttonAltText]}>Criar conta</Text>
          </Pressable>
          <Pressable style={({pressed}) => [pressed && authStyles.pressedLink, authStyles.button, authStyles.buttonLink]} onPress={() => router.push('/home/property')}>
            <Text style={[authStyles.buttonText, authStyles.buttonLinkText]}>Continuar sem login</Text>
          </Pressable>
        </View>
      </Card>
    </AuthContainer>
  );
}