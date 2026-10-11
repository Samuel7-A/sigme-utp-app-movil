import { useRegistro } from "@/context/RegistroContext";
import type { ComponentProps } from "react";
import { useState } from "react";

import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RED = "#B70F35";
const DARK = "#172238";

const initialForm = {
  codigo: "",
  dni: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  modelo: "",
  placa: "",
  password: "",
  confirmarPassword: "",
};

type FieldKey = keyof typeof initialForm;
type IconName = ComponentProps<typeof Ionicons>["name"];

type InputOptions = {
  keyboardType?: "default" | "number-pad" | "phone-pad";
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "characters";
  secure?: "password" | "confirm";
};


export default function RegistroScreen() {
  const router = useRouter();

  const {
    data: form,
    updateField: updateRegistroField,
  } = useRegistro();

  const [errors, setErrors] =
    useState<Partial<Record<FieldKey, string>>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  const updateField = (key: FieldKey, value: string) => {
    updateRegistroField(key, value);

    setErrors((previous) => ({
      ...previous,
      [key]: undefined,
    }));

    setMessage("");
  };

  const handleSubmit = () => {
    const nextErrors: Partial<Record<FieldKey, string>> = {};

    const values = {
      codigo: form.codigo.trim(),
      dni: form.dni.trim(),
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
      telefono: form.telefono.trim(),
      modelo: form.modelo.trim(),
      placa: form.placa.trim().toUpperCase(),
      password: form.password,
      confirmarPassword: form.confirmarPassword,
    };

    for (const key of Object.keys(values) as FieldKey[]) {
      if (!values[key]) {
        nextErrors[key] = "Este campo es obligatorio.";
      }
    }

    if (
      values.codigo &&
      !/^U?\d{7,10}$/i.test(values.codigo)
    ) {
      nextErrors.codigo = "Ingresa un código universitario válido.";
    }

    if (
      values.dni &&
      !/^\d{8}$/.test(values.dni)
    ) {
      nextErrors.dni = "El DNI debe tener 8 dígitos.";
    }

    if (
      values.telefono &&
      !/^\d{9}$/.test(values.telefono)
    ) {
      nextErrors.telefono = "Ingresa un teléfono de 9 dígitos.";
    }

    if (
      values.placa &&
      !/^[A-Z0-9]{3}-?[A-Z0-9]{3,4}$/i.test(values.placa)
    ) {
      nextErrors.placa = "Ingresa una placa válida.";
    }

    if (
      values.password &&
      values.password.length < 8
    ) {
      nextErrors.password = "Mínimo 8 caracteres.";
    }

    if (
      values.confirmarPassword &&
      values.password !== values.confirmarPassword
    ) {
      nextErrors.confirmarPassword =
        "Las contraseñas no coinciden.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage("Revisa los campos señalados.");
      return;
    }

    // Por ahora solo validamos la vista.
    // Todavía no enviamos datos al backend.
    router.push("/registro-datos");
  };

  const renderSection = (
    title: string,
    icon: IconName
  ) => (
    <View style={styles.sectionHeader}>
      <Ionicons
        name={icon}
        size={18}
        color={RED}
      />

      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.sectionLine} />
    </View>
  );

  const renderField = (
    key: FieldKey,
    label: string,
    placeholder: string,
    icon: IconName,
    options: InputOptions = {}
  ) => {
    const isPassword = options.secure === "password";
    const isConfirm = options.secure === "confirm";
    const isSecure = isPassword || isConfirm;

    const visible = isPassword
      ? showPassword
      : isConfirm
        ? showConfirm
        : true;

    return (
      <View style={styles.field}>
        <Text style={styles.label}>
          {label}
        </Text>

        <View
          style={[
            styles.inputContainer,
            errors[key] ? styles.inputError : undefined,
          ]}
        >
          <Ionicons
            name={icon}
            size={17}
            color="#222222"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            value={form[key]}
            onChangeText={(value) => updateField(key, value)}
            placeholder={placeholder}
            placeholderTextColor="#AAAAAA"
            keyboardType={options.keyboardType ?? "default"}
            maxLength={options.maxLength}
            autoCapitalize={
              options.autoCapitalize ?? "sentences"
            }
            autoCorrect={false}
            secureTextEntry={isSecure && !visible}
          />

          {isSecure && (
            <Pressable
              style={styles.eyeButton}
              onPress={() => {
                if (isPassword) {
                  setShowPassword((previous) => !previous);
                } else {
                  setShowConfirm((previous) => !previous);
                }
              }}
              accessibilityRole="button"
              accessibilityLabel={
                visible
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              <Ionicons
                name={
                  visible
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={19}
                color="#222222"
              />
            </Pressable>
          )}
        </View>

        {!!errors[key] && (
          <Text style={styles.errorText}>
            {errors[key]}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Flecha de regreso */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.replace("/login")}
            accessibilityLabel="Volver al inicio de sesión"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#111111"
            />
          </Pressable>

          {/* Título */}
          <Text style={styles.title}>
            Registro de Usuario
          </Text>

          {/* DATOS PERSONALES */}
          {renderSection(
            "Datos personales",
            "person-outline"
          )}

          {renderField(
            "codigo",
            "Código universitario",
            "Ej: U20231234",
            "school-outline",
            { autoCapitalize: "characters" }
          )}

          {renderField(
            "dni",
            "DNI",
            "Ej: 12345678",
            "card-outline",
            {
              keyboardType: "number-pad",
              maxLength: 8,
            }
          )}

          {renderField(
            "nombres",
            "Nombres",
            "Ingresa tus nombres",
            "person-outline"
          )}

          {renderField(
            "apellidos",
            "Apellidos",
            "Ingresa tus apellidos",
            "person-outline"
          )}

          {renderField(
            "telefono",
            "Número de teléfono",
            "Ej: 987 654 321",
            "call-outline",
            {
              keyboardType: "phone-pad",
              maxLength: 9,
            }
          )}

          {/* DATOS DEL VEHÍCULO */}
          {renderSection(
            "Datos del vehículo",
            "car-sport"
          )}

          {renderField(
            "modelo",
            "Modelo del vehículo",
            "Ej: Ford Bronco",
            "car-sport-outline"
          )}

          {renderField(
            "placa",
            "Placa del vehículo",
            "Ej: ABC-123",
            "card-outline",
            { autoCapitalize: "characters" }
          )}

          {/* SEGURIDAD */}
          {renderSection(
            "Seguridad",
            "lock-closed"
          )}

          {renderField(
            "password",
            "Contraseña",
            "Mínimo 8 caracteres",
            "lock-closed-outline",
            {
              secure: "password",
              autoCapitalize: "none",
            }
          )}

          {renderField(
            "confirmarPassword",
            "Confirmar contraseña",
            "Repite tu contraseña",
            "lock-closed-outline",
            {
              secure: "confirm",
              autoCapitalize: "none",
            }
          )}

          {!!message && (
            <Text style={styles.message}>
              {message}
            </Text>
          )}

          {/* CREAR CUENTA */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSubmit}
          >
            <Ionicons
              name="person-add-outline"
              size={19}
              color="#FFFFFF"
            />

            <Text style={styles.createButtonText}>
              Continuar
            </Text>
          </Pressable>

          {/* INICIAR SESIÓN */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Ya tienes cuenta?
            </Text>

            <Pressable
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.loginLink}>
                Inicia sesión
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 23,
    paddingTop: 17,
    paddingBottom: 36,
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 42,
    height: 34,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 17,
  },

  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#171717",
    textAlign: "center",
    marginBottom: 23,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 15,
  },

  sectionTitle: {
    color: RED,
    fontSize: 14,
    fontWeight: "500",
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DADDE2",
    marginLeft: 3,
  },

  field: {
    marginBottom: 11,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 5,
  },

  inputContainer: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8CDD4",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  inputError: {
    borderColor: RED,
  },

  inputIcon: {
    marginLeft: 11,
    marginRight: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: 12,
    color: DARK,
  },

  eyeButton: {
    height: 38,
    width: 39,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    marginTop: 4,
    color: RED,
    fontSize: 11,
  },

  message: {
    marginTop: 13,
    color: RED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },

  createButton: {
    height: 44,
    marginTop: 28,
    borderRadius: 7,
    backgroundColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 20,
  },

  footerText: {
    fontSize: 12,
    color: "#171717",
  },

  loginLink: {
    fontSize: 12,
    color: "#16489C",
    fontWeight: "600",
  },
});