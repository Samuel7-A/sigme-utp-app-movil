
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

import { useRegistro } from "@/context/RegistroContext";

const RED = "#B70F35";
const DARK = "#172238";

type DatosKey =
  | "correo"
  | "nacimiento"
  | "licencia"
  | "vencimiento"
  | "conadis";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Campo = {
  key: DatosKey;
  label: string;
  placeholder: string;
  icon: IconName;
  optional?: boolean;
};

const campos: Campo[] = [
  {
    key: "correo",
    label: "Correo institucional",
    placeholder: "usuario@utp.edu.pe",
    icon: "mail-outline",
  },
  {
    key: "nacimiento",
    label: "Fecha de nacimiento",
    placeholder: "AAAA-MM-DD",
    icon: "calendar-outline",
  },
  {
    key: "licencia",
    label: "Número de licencia de conducir",
    placeholder: "Ingresa tu número de licencia",
    icon: "card-outline",
  },
  {
    key: "vencimiento",
    label: "Vencimiento de la licencia",
    placeholder: "AAAA-MM-DD",
    icon: "calendar-outline",
  },
  {
    key: "conadis",
    label: "Código CONADIS",
    placeholder: "Opcional",
    icon: "document-text-outline",
    optional: true,
  },
];

function fechaValida(valor: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }

  const fecha = new Date(`${valor}T00:00:00Z`);

  return (
    !Number.isNaN(fecha.getTime()) &&
    fecha.toISOString().slice(0, 10) === valor
  );
}

function fechaHoy() {
  const hoy = new Date();

  return [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function RegistroDatosScreen() {
  const router = useRouter();

  const { data, updateField } = useRegistro();

  const [errors, setErrors] =
    useState<Partial<Record<DatosKey, string>>>({});

  const [message, setMessage] = useState("");

  const [licenciaAdvertida, setLicenciaAdvertida] =
    useState(false);

  const handleChange = (key: DatosKey, value: string) => {
    updateField(key, value);

    setErrors((previous) => ({
      ...previous,
      [key]: undefined,
    }));

    if (key === "vencimiento") {
      setLicenciaAdvertida(false);
    }

    setMessage("");
  };

  const handleContinue = () => {
    const nextErrors: Partial<Record<DatosKey, string>> = {};

    for (const campo of campos) {
      if (!campo.optional && !data[campo.key].trim()) {
        nextErrors[campo.key] = "Este campo es obligatorio.";
      }
    }

    if (
      data.correo.trim() &&
      !/^[^\s@]+@utp\.edu\.pe$/i.test(data.correo.trim())
    ) {
      nextErrors.correo =
        "Ingresa un correo institucional UTP válido.";
    }

    if (
      data.nacimiento.trim() &&
      !fechaValida(data.nacimiento.trim())
    ) {
      nextErrors.nacimiento =
        "Ingresa una fecha válida en formato AAAA-MM-DD.";
    }

    if (
      data.vencimiento.trim() &&
      !fechaValida(data.vencimiento.trim())
    ) {
      nextErrors.vencimiento =
        "Ingresa una fecha válida en formato AAAA-MM-DD.";
    }

    if (
      fechaValida(data.nacimiento.trim()) &&
      data.nacimiento.trim() > fechaHoy()
    ) {
      nextErrors.nacimiento =
        "La fecha de nacimiento no puede ser futura.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage("Revisa los campos señalados.");
      return;
    }

    if (
      data.vencimiento.trim() < fechaHoy() &&
      !licenciaAdvertida
    ) {
      setLicenciaAdvertida(true);

      setMessage(
        "Atención: la licencia de conducir está vencida. Revisa la fecha. Si deseas continuar con estos datos, vuelve a presionar Continuar."
      );

      return;
    }

    // RF02 será el siguiente paso.
    // Todavía NO enviamos datos ni creamos cuentas.
    setMessage(
      "Datos adicionales validados. El siguiente paso será aceptar los términos y condiciones (RF02)."
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Volver al registro"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#111111"
            />
          </Pressable>

          <Text style={styles.title}>
            Registro de Usuario
          </Text>

          <Text style={styles.subtitle}>
            Completa tus datos adicionales
          </Text>

          <View style={styles.sectionHeader}>
            <Ionicons
              name="document-text-outline"
              size={18}
              color={RED}
            />

            <Text style={styles.sectionTitle}>
              Información adicional
            </Text>

            <View style={styles.sectionLine} />
          </View>

          {campos.map((campo) => (
            <View key={campo.key} style={styles.field}>
              <Text style={styles.label}>
                {campo.label}
                {campo.optional ? " (opcional)" : ""}
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  errors[campo.key]
                    ? styles.inputError
                    : undefined,
                ]}
              >
                <Ionicons
                  name={campo.icon}
                  size={17}
                  color="#222222"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  value={data[campo.key]}
                  onChangeText={(value) =>
                    handleChange(campo.key, value)
                  }
                  placeholder={campo.placeholder}
                  placeholderTextColor="#AAAAAA"
                  keyboardType={
                    campo.key === "correo"
                      ? "email-address"
                      : "default"
                  }
                  autoCapitalize={
                    campo.key === "correo"
                      ? "none"
                      : "characters"
                  }
                  autoCorrect={false}
                />
              </View>

              {!!errors[campo.key] && (
                <Text style={styles.errorText}>
                  {errors[campo.key]}
                </Text>
              )}
            </View>
          ))}

          <Text style={styles.hint}>
            Para las fechas utiliza el formato AAAA-MM-DD.
            Ejemplo: 2028-12-31.
          </Text>

          {!!message && (
            <Text style={styles.message}>
              {message}
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 23,
    paddingTop: 17,
    paddingBottom: 36,
  },

  backButton: {
    width: 42,
    height: 34,
    justifyContent: "center",
    marginBottom: 17,
  },

  title: {
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
    color: "#171717",
  },

  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#777777",
    marginTop: 8,
    marginBottom: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 14,
    color: RED,
    fontWeight: "500",
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DADDE2",
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 5,
  },

  inputContainer: {
    height: 40,
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
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: DARK,
    fontSize: 12,
  },

  errorText: {
    color: RED,
    fontSize: 11,
    marginTop: 4,
  },

  hint: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  message: {
    color: RED,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 20,
  },

  button: {
    height: 44,
    backgroundColor: RED,
    borderRadius: 7,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});