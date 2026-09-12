import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
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
    if (!formularioCompleto) {
      Alert.alert("Campos incompletos", "Ingresa tu usuario y contraseña.");
      return;
    }

    // Luego aquí conectaremos el Auth Service.
    console.log("LOGIN:", {
      usuario,
      password,
    });

    Alert.alert("Login", "Por ahora el login es solo visual.");
  };

  const handleForgotPassword = () => {
    // Luego podremos navegar a:
    // router.push("/forgot-password");

    Alert.alert(
      "Recuperar contraseña",
      "Esta pantalla todavía está pendiente."
    );
  };

  const handleRegister = () => {
    // Luego podremos navegar a:
    // router.push("/register");

    Alert.alert(
      "Registro",
      "Esta pantalla todavía está pendiente."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <View style={styles.utpBox}>
              <Text style={styles.utpText}>UTP</Text>
            </View>

            <Text style={styles.plus}>+</Text>

            <Text style={styles.parkingText}>parking</Text>
          </View>

          {/* TÍTULO */}
          <View style={styles.header}>
            <Text style={styles.title}>Accede</Text>

            <Text style={styles.subtitle}>
              Ingresando tus datos de alumno.
            </Text>

            <View style={styles.separator} />
          </View>

          {/* USUARIO */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Usuario: Código de alumno UTP
            </Text>

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
                Ejemplo de usuario: U1578268 (no digitar el{"\n"}
                @utp.edu.pe)
              </Text>
            </View>
          </View>

          {/* CONTRASEÑA */}
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
                onPress={() =>
                  setMostrarPassword((valorAnterior) => !valorAnterior)
                }
              >
                <Text style={styles.eye}>
                  {mostrarPassword ? "●" : "◉"}
                </Text>
              </Pressable>
            </View>

            <Pressable onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>
                ¿Olvidó su contraseña?
              </Text>
            </Pressable>
          </View>

          {/* BOTÓN INGRESAR */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              formularioCompleto && styles.buttonEnabled,
              pressed && formularioCompleto && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text
              style={[
                styles.buttonText,
                formularioCompleto && styles.buttonTextEnabled,
              ]}
            >
              Ingresar
            </Text>
          </Pressable>

          {/* BOTÓN REGISTRARSE */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFF4FA",
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    width: "82%",
    alignSelf: "center",
    paddingTop: 58,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 57,
  },

  utpBox: {
    backgroundColor: "#000000",
    height: 43,
    minWidth: 82,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  utpText: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -2,
  },

  plus: {
    color: "#FF496C",
    fontSize: 39,
    fontWeight: "700",
    marginHorizontal: 3,
    marginTop: -2,
  },

  parkingText: {
    color: "#000000",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -1.3,
  },

  header: {
    marginBottom: 23,
  },

  title: {
    color: "#595959",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: "#737373",
    fontSize: 13,
  },

  separator: {
    height: 1,
    backgroundColor: "#C5D6DC",
    marginTop: 13,
  },

  fieldGroup: {
    marginBottom: 20,
  },

  label: {
    color: "#5C5C5C",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  input: {
    width: "100%",
    height: 39,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 4,
    paddingHorizontal: 12,
    color: "#333333",
    fontSize: 13,
  },

  helpRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },

  infoCircle: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1.4,
    borderColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 1,
  },

  infoText: {
    color: "#252525",
    fontSize: 10,
    fontWeight: "800",
    lineHeight: 11,
  },

  helpText: {
    flex: 1,
    color: "#666666",
    fontSize: 12,
    lineHeight: 16,
  },

  passwordContainer: {
    width: "100%",
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 4,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    color: "#333333",
    fontSize: 13,
  },

  eyeButton: {
    height: "100%",
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  eye: {
    color: "#777777",
    fontSize: 17,
  },

  forgotPassword: {
    color: "#26135D",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },

  button: {
    height: 37,
    width: "100%",
    backgroundColor: "#D6E1F5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonEnabled: {
    backgroundColor: "#B7CBEF",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: "#686868",
    fontSize: 13,
    fontWeight: "600",
  },

  buttonTextEnabled: {
    color: "#454545",
  },

  registerButton: {
    marginTop: 24,
  },
});