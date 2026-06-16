import AppVersion from '@/components/AppVersion';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const logo = require("@/assets/images/logo.png");

export default function EntryScreen() {
  const insets = useSafeAreaInsets();

  const openRegisterPage = async () => {
    const url = 'https://caminhodaroca.senar-rio.com.br/cadastro-propriedade-publica';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.shell,
        {
          paddingTop: insets.top + 14,
          paddingBottom: insets.bottom + 12,
        },
      ]}
      alwaysBounceVertical={false}
      bounces={false}
    >
      <View style={styles.content}>
        <View style={styles.brandArea}>
          <Image style={styles.logo} source={logo} contentFit="contain" />
        </View>

        <View style={styles.mainCard}>
          <View style={styles.touristHero}>
            <View style={styles.heroHeader}>
              <View style={styles.touristHeroIcon}>
                <FontAwesome5 name="hiking" size={18} color="#fff" />
              </View>
              <Text style={styles.heroTitle}>
                Sou turista e quero viver experiências rurais
              </Text>
            </View>
            <Text style={styles.heroDescription}>
              Descubra destinos, vivências, produtos e roteiros perto de você.
            </Text>

            <View style={styles.touristActions}>
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
                onPress={() => router.push('/home/property')}
              >
                <Text style={styles.primaryButtonText}>Explorar agora</Text>
              </Pressable>

              <View style={styles.accountLinks}>
                <Text style={styles.accountHint}>Já tem conta?</Text>
                <View style={styles.accountActions}>
                  <Pressable
                    style={({ pressed }) => [styles.accountPill, pressed && styles.accountPillPressed]}
                    onPress={() => router.push('/login')}
                  >
                    <Text style={styles.accountPillText}>Entrar</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.accountPill, pressed && styles.accountPillPressed]}
                    onPress={() => router.push('/register')}
                  >
                    <Text style={styles.accountPillText}>Criar conta</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.partnerEntry}>
            <Text style={styles.partnerTitle}>Para divulgar ou apoiar o turismo</Text>

            <View style={styles.partnerList}>
              <PartnerEntryButton
                icon="store"
                iconFamily="FontAwesome5"
                title="Divulgue seu negócio"
                description="Cadastre sua propriedade, produtos artesanais, serviços, agência de viagem, etc."
                onPress={openRegisterPage}
              />
              <PartnerEntryButton
                icon="building-columns"
                title="Sou uma instituição e quero apoiar o turismo da minha região"
                description="Cadastre atividades e programações do município na sua região (secretarias de turismo, associações, consórcios regionais etc.)"
                onPress={() => router.push('/institution')}
              />
            </View>
          </View>
        </View>

        <AppVersion style={styles.version} />
      </View>
    </ScrollView>
  );
}

type PartnerEntryButtonProps = {
  icon: string;
  iconFamily?: "FontAwesome5" | "FontAwesome6";
  title: string;
  description: string;
  onPress: () => void;
};

function PartnerEntryButton({
  icon,
  iconFamily = "FontAwesome6",
  title,
  description,
  onPress,
}: PartnerEntryButtonProps) {
  const Icon = iconFamily === "FontAwesome5" ? FontAwesome5 : FontAwesome6;

  return (
    <Pressable
      style={({ pressed }) => [styles.partnerItem, pressed && styles.partnerItemPressed]}
      onPress={onPress}
    >
      <View style={styles.partnerIcon}>
        <Icon name={icon as never} size={16} color="#287a6d" />
      </View>
      <View style={styles.partnerCopy}>
        <Text style={styles.partnerItemTitle}>{title}</Text>
        <Text style={styles.partnerItemDescription}>{description}</Text>
      </View>
      <View style={styles.partnerArrow}>
        <FontAwesome6 name="arrow-right" size={16} color="#1f645a" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#287a6d',
  },
  shell: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#287a6d',
    paddingHorizontal: 18,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  brandArea: {
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingBottom: 50,
  },
  logo: {
    width: 230,
    maxWidth: '100%',
    height: 70,
  },
  mainCard: {
    width: '100%',
    flexShrink: 1,
    gap: 12,
    padding: 14,
    borderRadius: 22,
    backgroundColor: '#fff',
    shadowColor: '#102f2a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 6,
  },
  touristHero: {
    borderRadius: 18,
    padding: 15,
    backgroundColor: '#f3faf7',
    borderWidth: 1,
    borderColor: '#d5e7e1',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  touristHeroIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#287a6d',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: '#287a6d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 4,
  },
  heroTitle: {
    flex: 1,
    color: '#21403a',
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 20,
  },
  heroDescription: {
    color: '#6a817b',
    fontSize: 13,
    lineHeight: 18,
  },
  touristActions: {
    gap: 12,
    marginTop: 18,
  },
  primaryButton: {
    width: '100%',
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: '#287a6d',
    borderWidth: 1,
    borderColor: '#287a6d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: '#1f645a',
    borderColor: '#1f645a',
    transform: [{ scale: 0.985 }],
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
  },
  accountLinks: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  accountHint: {
    color: '#6a817b',
    fontSize: 12,
    lineHeight: 15,
  },
  accountActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  accountPill: {
    minHeight: 32,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(40, 122, 109, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountPillPressed: {
    backgroundColor: 'rgba(40, 122, 109, 0.12)',
    transform: [{ scale: 0.985 }],
  },
  accountPillText: {
    color: '#1f645a',
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 16,
  },
  partnerEntry: {
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2eee9',
    borderRadius: 18,
    backgroundColor: '#fbfdfc',
  },
  partnerTitle: {
    color: '#21403a',
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 20,
  },
  partnerList: {
    gap: 10,
  },
  partnerItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    padding: 11,
    borderWidth: 1,
    borderColor: '#dce8e3',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
  },
  partnerItemPressed: {
    borderColor: '#bdd7d0',
    backgroundColor: '#f7fbfa',
    transform: [{ scale: 0.99 }],
  },
  partnerIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#e9f5f2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  partnerCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  partnerItemTitle: {
    color: '#21403a',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 16,
  },
  partnerItemDescription: {
    color: '#6a817b',
    fontSize: 12,
    lineHeight: 16,
  },
  partnerArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(40, 122, 109, 0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  version: {
    fontWeight: 500,
    marginTop: 8,
    opacity: 0.72,
  },
});
