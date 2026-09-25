import type { ComponentProps } from "react";
import { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMenu } from "@/context/MenuContext";
import { useRouter } from "expo-router";

type MenuItem = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  route: string;
};

const menuItems: MenuItem[] = [
  { label: "Historial", icon: "time-outline", route: "/historial" },
  { label: "Parking", icon: "car-outline", route: "/mapa" },
  { label: "Ayuda", icon: "help-circle-outline", route: "/ayuda" },
  { label: "Vehículos", icon: "car-sport-outline", route: "/vehiculos" },
  { label: "Inicio", icon: "home-outline", route: "/" },
];

export default function SideMenu() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavigate = (route: string) => {
    setIsMenuOpen(false);
    router.push(route as any);
  };

  const handleLogout = async () => {
    // Acá va la lógica de logout que armamos antes:
    // borrar token, limpiar estado global, llamar al backend, redirigir
    setShowLogoutConfirm(false);
    setIsMenuOpen(false);
    router.replace("/login" as any);
  };

  return (
    <Modal visible={isMenuOpen} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={() => setIsMenuOpen(false)} />
      <View style={styles.drawer}>
        {menuItems.map((item) => (
          <Pressable
            key={item.label}
            style={styles.item}
            onPress={() => handleNavigate(item.route)}
          >
            <Ionicons name={item.icon} size={20} color="#fff" />
            <Text style={styles.itemText}>{item.label}</Text>
          </Pressable>
        ))}

        <Pressable
          style={styles.item}
          onPress={() => setShowLogoutConfirm(true)}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.itemText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      {showLogoutConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>¿Cerrar sesión?</Text>
            <Text style={styles.confirmText}>
              Tendrás que volver a iniciar sesión para acceder.
            </Text>
            <View style={styles.confirmActions}>
              <Pressable onPress={() => setShowLogoutConfirm(false)}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable onPress={handleLogout}>
                <Text style={{ color: "red" }}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "#E63946",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  item: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  itemText: { color: "#fff", fontSize: 16 },
  confirmOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center",
  },
  confirmBox: { backgroundColor: "#fff", padding: 24, borderRadius: 12, width: "80%" },
  confirmTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  confirmText: { color: "#666", marginBottom: 20 },
  confirmActions: { flexDirection: "row", justifyContent: "space-between" },
});