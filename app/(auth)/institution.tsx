import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import { authStyles } from '@/styles/auth';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function InstitutionScreen() {
  return (
    <AuthContainer title="Como deseja entrar?" logoMargin={25} withBackButton={true}>
      <Card>
        <Text style={authStyles.cardTitle}>
          Entenda a diferença antes de continuar:
        </Text>
        <Pressable onPress={() => router.push('/login')}>
          <View style={[authStyles.cardLoginMethod]}>
            <View style={authStyles.cardLoginBody}>
              <LinearGradient
                colors={['#edf8ea', '#edf8ea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[authStyles.cardLoginIcon]}
              >
                <FontAwesome6 name="circle-check" size={18} color="#4a9744" />
              </LinearGradient>
              <View style={authStyles.cardLoginContent}>
                <Text style={authStyles.cardLoginTitle}>
                  Sou negócio rural 
                </Text>
                <Text style={authStyles.cardLoginDescription}>
                  Essa opção é para quem tem seu próprio negócio rural e quer divulgar no
                  Caminho da Roça (hospedagem, day-use, roteiros, atrativos, circuitos,
                  produtos artesanais etc.).
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/login')}>
          <View style={authStyles.cardLoginMethod}>
            <View style={authStyles.cardLoginBody}>
              <LinearGradient
                colors={['#edf8ea', '#edf8ea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={authStyles.cardLoginIcon}
              >
                <FontAwesome6 name="building-columns" size={18} color="#4a9744" />
              </LinearGradient>
              <View style={authStyles.cardLoginContent}>
                <Text style={authStyles.cardLoginTitle}>
                  Sou instituição
                </Text>
                <Text style={authStyles.cardLoginDescription}>
                  Essa opção é para entidades que desejam apoiar o turismo da região
                  (secretarias de turismo, associações, consórcios regionais etc.).
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
        <View style={authStyles.cardActions}>
          <Pressable style={({pressed}) => [pressed && authStyles.pressedPrimary, authStyles.button, authStyles.buttonPrimary, {backgroundColor: '#4a9744'}]} onPress={() => router.push('/login')}>
            <Text style={[authStyles.buttonText, authStyles.buttonPrimaryText]}>Entrar para divulgar</Text>
          </Pressable>
          <Pressable style={({pressed}) => [pressed && authStyles.pressedAlt, authStyles.button, authStyles.buttonAlt]} onPress={() => router.push('/partner')}>
            <Text style={[authStyles.buttonText, authStyles.buttonAltText, {color: '#4a9744'}]}>Cadastrar meu espaço</Text>
          </Pressable>
        </View>
      </Card>
    </AuthContainer>
  );
}