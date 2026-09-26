import { styles } from "@/styles/login.styles";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const formularioCompleto =
    usuario.trim().length > 0 && password.trim().length > 0;

 const handleLogin = () => {
 router.push("/(tabs)");
};

  const handleForgotPassword = () => {
    Alert.alert("Recuperar contraseña", "Esta pantalla todavía está pendiente.");
  };

  const handleRegister = () => {
    router.push("/registro");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.utpBox}>
              <Text style={styles.utpText}>UTP</Text>
            </View>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.parkingText}>parking</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Accede</Text>
            <Text style={styles.subtitle}>Ingresando tus datos de alumno.</Text>
            <View style={styles.separator} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Usuario: Código de alumno UTP</Text>
            <TextInput
              style={styles.input}
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Ej. 1482720 o U71698935"
              placeholderTextColor="#A7A7A7"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.helpRow}>
              <View style={styles.infoCircle}>
                <Text style={styles.infoText}>i</Text>
              </View>
              <Text style={styles.helpText}>
                Ejemplo de usuario: U1578268 (no digitar el{"\n"}@utp.edu.pe)
              </Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#A7A7A7"
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setMostrarPassword((v) => !v)}
              >
                <Text style={styles.eye}>{mostrarPassword ? "●" : "◉"}</Text>
              </Pressable>
            </View>
            <Pressable onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              formularioCompleto && styles.buttonEnabled,
              pressed && formularioCompleto && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, formularioCompleto && styles.buttonTextEnabled]}>
              Ingresar
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}