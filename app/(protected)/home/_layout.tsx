import AppVersion from "@/components/AppVersion";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Feather, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const avatar = require('@/assets/images/avatar.jpg');

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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
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
      </Tabs>
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
        <View style={styles.header}>
          <Text style={styles.title}>Minha Conta</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <Feather name="x" size={24} color="rgba(0,0,0,0.5)" />
          </Pressable>
        </View>
        <View style={styles.body}>
          <View style={globalStyles.itemsCenter}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={styles.name}>João da Silva</Text>
          </View>
          <View style={styles.menuItem}>
            <FontAwesome5 size={21} name="user-alt" color={theme.colors.success} style={styles.menuIcon} />
            <Text style={styles.menuText}>Meus Dados</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="document-text" size={21} color={theme.colors.success} style={styles.menuIcon} />
            <Text style={styles.menuText}>Termos de Uso</Text>
          </View>
          <View style={[styles.menuItem, {borderBottomWidth: 0}]}>
            <FontAwesome6 size={21} name="arrow-right-from-bracket" color={theme.colors.danger} style={styles.menuIcon} />
            <Text style={[styles.menuText, {color: theme.colors.danger}]}>Sair</Text>
          </View>
          <AppVersion theme="light" />
        </View>
      </Modal>
    </>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    color: theme.colors.body,
    marginBottom: 24,
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
