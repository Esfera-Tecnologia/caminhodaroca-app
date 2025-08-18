import { theme } from '@/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';

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
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTitle: () => <LogoTitle />,
      headerTitleAlign: 'center',
      tabBarInactiveTintColor: "#888",
      tabBarActiveTintColor: theme.colors.primary,
      tabBarLabelStyle: {
        fontSize: 12,
      }
    }}>
      <Tabs.Screen
        name="property"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome5 size={21} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <FontAwesome5 size={21} name="map-marked-alt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Minha Conta',
          tabBarIcon: ({ color }) => <FontAwesome5 size={21} name="user-alt" color={color} />,
        }}
      />
    </Tabs>
  );
}
