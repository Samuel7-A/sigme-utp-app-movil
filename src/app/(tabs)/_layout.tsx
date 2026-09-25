import { Pressable, View } from "react-native";

import { Tabs } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useMenu } from "@/context/MenuContext";
import { COLORS, styles } from "@/styles/dashboard.styles";

export default function TabsLayout() {
  const { setIsMenuOpen } = useMenu();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textGray,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 16,
            height: 60,
            borderRadius: 20,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            paddingBottom: 0,
            paddingTop: 0,
            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="mapa"
          options={{
            title: "Mapa",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="parking"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="vehiculos"
          options={{
            title: "Vehículos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="historial"
          options={{
            title: "Historial",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Botón flotante "+" encima de la barra de pestañas */}
      <Pressable style={styles.addButton} onPress={() => setIsMenuOpen(true)}>
        <Ionicons name="add" size={20} color="#FFF" />
      </Pressable>
    </View>
  );
}
