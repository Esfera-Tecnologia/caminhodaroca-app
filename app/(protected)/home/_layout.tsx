import AppVersion from "@/components/AppVersion";
import Avatar from "@/components/Avatar";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { theme } from "@/theme";
import { Feather, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { router, Tabs } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


function LogoTitle() {
  return (
    <Image
      source={require("@/assets/images/logo.png")}
      style={{ width: 120, height: 40 }}
      contentFit='contain'
    />
  );
}
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { user, onLogout } = useAuth();
  const onMenuPress = (handlePress: () => void) => {
    handlePress();
    setModalVisible(false);
  }
  const handleLogout = () => {
    onLogout();
    setModalVisible(false);
    router.push('/home/property');
  };
  return (
    <LocationProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#eee",
            height: 60 + insets.bottom,
            paddingBottom: 0,
          },
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: "center",
          tabBarInactiveTintColor: "#888",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="property"
          options={{
            title: "Início",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={21} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="maps"
          options={{
            title: "Mapa",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={21} name="map-marked-alt" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Minha Conta",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={21} name="user-alt" color={color} />
            ),
            tabBarButton: (props: BottomTabBarButtonProps) => (
              <Pressable
                onPress={() => setModalVisible(true)}
                style={props.style}
                accessibilityRole={props.accessibilityRole}
                accessibilityState={props.accessibilityState}
                accessibilityLabel={props.accessibilityLabel}
                testID={props.testID}
              >
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="terms"
          options={{
            href: null
          }}
        />
      </Tabs>
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
        <View style={styles.header}>
          <Text style={styles.title}>Minha Conta</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <Feather name="x" size={24} color="rgba(0,0,0,0.5)" />
          </Pressable>
        </View>
        <View style={styles.body}>
          {user ? (
            <View>
              <Avatar />
              <Pressable style={styles.menuItem} onPress={() => onMenuPress(() => router.navigate('/home/profile'))}>
                <FontAwesome5 size={21} name="user-alt" color={theme.colors.success} style={styles.menuIcon} />
                <Text style={styles.menuText}>Meus Dados</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={() => onMenuPress(() => router.navigate('/home/terms'))}>
                <Ionicons name="document-text" size={21} color={theme.colors.success} style={styles.menuIcon} />
                <Text style={styles.menuText}>Termos de Uso</Text>
              </Pressable>
              <Pressable style={[styles.menuItem, {borderBottomWidth: 0}]} onPress={handleLogout}>
                <FontAwesome6 size={21} name="arrow-right-from-bracket" color={theme.colors.danger} style={styles.menuIcon} />
                <Text style={[styles.menuText, {color: theme.colors.danger}]}>Sair</Text>
              </Pressable>
              <AppVersion theme="light" />
            </View>
          ) : (
            <View style={{paddingHorizontal: 20, paddingTop: 40}}>
              <Image
                source={require("@/assets/images/farm1.png")}
                style={{ width: 'auto', height: 100 }}
                contentFit='contain'
              />
              <Text style={[styles.title]}>Bem-vindo ao Caminho da Roça</Text>
              <Text style={{marginBottom: 16}}>
                Faça login ou crie uma conta para desfrutar de todas as
                funcionalidades do aplicativo.
              </Text>
              <PrimaryButton label="Ir para o login" onPress={() => router.push('/login')} />
            </View>
          )}
        </View>
      </Modal>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  body: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#dee2e6"
  },
  menuIcon: {
    marginEnd: 16
  },
  menuText: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.body
  }
})
