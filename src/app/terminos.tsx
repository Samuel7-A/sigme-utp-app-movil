import { useRegistro } from "@/context/RegistroContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";

const RED = "#B70F35";
const INK = "#172238";

type Choice = "si" | "no" | null;
type DeclarationId = 1 | 2 | 3;

// Resúmenes para la maqueta. Sustituir por la política oficial aprobada.
const DECLARACIONES: { id: DeclarationId; title: string; description: string }[] = [
  {
    id: 1,
    title: "Conocimiento de las condiciones de uso",
    description:
      "Declaro conocer y aceptar las disposiciones aplicables al uso del estacionamiento para estudiantes o colaboradores.",
  },
  {
    id: 2,
    title: "Edad y documentación vigente",
    description:
      "Declaro ser mayor de edad y contar con documento de identidad y licencia de conducir válidos y vigentes.",
  },
  {
    id: 3,
    title: "Titularidad y condiciones del vehículo",
    description:
      "Declaro ser titular o poseedor autorizado del vehículo, contar con documentación, SOAT y revisión técnica vigentes cuando correspondan, y que no existe impedimento legal para su circulación.",
  },
];

const CONDICIONES = [
  "El uso requiere autorización y está dirigido a estudiantes con matrícula activa y colaboradores activos, de acuerdo con las reglas aplicables.",
  "La autorización no garantiza una plaza exclusiva ni equivale a una reserva: el ingreso y la ubicación dependen de la disponibilidad.",
  "El procedimiento contempla revisiones de seguridad al ingresar o salir, conforme a la política aplicable y en presencia del usuario.",
  "El usuario debe asegurar puertas, ventanas y maletera y cuidar sus objetos. Para motos y bicicletas deben adoptarse medidas de seguridad propias.",
];

const TIPOS = ["Automóvil", "Motocicleta", "Bicicleta", "Otro"];
const CATEGORIAS = ["Estudiante", "Docente", "Administrativo"];

export default function TerminosScreen() {
  const router = useRouter();
  const { data } = useRegistro();

  const [respuestas, setRespuestas] = useState<Record<DeclarationId, Choice>>({
    1: null,
    2: null,
    3: null,
  });
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [sede, setSede] = useState("");
  const [categoria, setCategoria] = useState("");
  const [carreraArea, setCarreraArea] = useState("");
  const [tipo1, setTipo1] = useState("");
  const [segundo, setSegundo] = useState(false);
  const [tipo2, setTipo2] = useState("");
  const [placa2, setPlaca2] = useState("");
  const [discapacidad, setDiscapacidad] = useState<Choice>(null);
  const [error, setError] = useState("");
  const [confirmacion, setConfirmacion] = useState("");

  const updateRespuesta = (id: DeclarationId, value: Choice) => {
    setRespuestas((prev) => ({ ...prev, [id]: value }));
    setError("");
    setConfirmacion("");
  };

  const enviar = () => {
    if (DECLARACIONES.some((d) => respuestas[d.id] !== "si")) {
      setError("Debes seleccionar Sí en las tres declaraciones para avanzar.");
      return;
    }
    if (!aceptaPrivacidad) {
      setError("Debes aceptar los términos y la política de privacidad.");
      return;
    }
    if (!sede.trim() || !categoria || !carreraArea.trim() || !tipo1 || !discapacidad) {
      setError("Completa sede, categoría, carrera/área, tipo de vehículo y discapacidad.");
      return;
    }
    if (segundo && (!tipo2 || !placa2.trim())) {
      setError("Completa el tipo y la placa del segundo vehículo, o quítalo.");
      return;
    }
    if (discapacidad === "si" && !data.conadis.trim()) {
      setError("Si corresponde, completa el código CONADIS en Datos adicionales.");
      return;
    }
    setError("");
    setConfirmacion(
      `Formulario validado localmente el ${new Date().toLocaleString("es-PE")}. ` +
        "Es una demostración: todavía no se creó una cuenta ni se registró la aceptación en el servidor."
    );
  };

  const selector = (
    value: Choice,
    change: (v: Choice) => void,
    description = "Seleccionar No impide continuar con el registro."
  ) => (
    <View style={styles.choices}>
      {(["si", "no"] as const).map((opcion) => (
        <Pressable
          key={opcion}
          style={styles.choiceRow}
          accessibilityRole="radio"
          accessibilityState={{ selected: value === opcion }}
          onPress={() => change(opcion)}
        >
          <Ionicons
            name={value === opcion ? "radio-button-on" : "radio-button-off"}
            size={21}
            color={value === opcion ? RED : "#8C929C"}
          />
          <Text style={styles.choiceText}>
            {opcion === "si" ? "Sí" : `No${description ? ` (${description})` : ""}`}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const labelValue = (label: string, value: string, placeholder = "Pendiente") => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.readOnly}>
        <Text style={value ? styles.value : styles.placeholder}>{value || placeholder}</Text>
      </View>
    </View>
  );

  const field = (
    label: string,
    value: string,
    onChangeText: (v: string) => void,
    placeholder: string
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(v) => { onChangeText(v); setError(""); setConfirmacion(""); }}
        placeholder={placeholder}
        placeholderTextColor="#9AA0A8"
        autoCorrect={false}
      />
    </View>
  );

  const chips = (items: string[], current: string, change: (v: string) => void) => (
    <View style={styles.chips}>
      {items.map((item) => (
        <Pressable
          key={item}
          style={[styles.chip, current === item && styles.chipSelected]}
          onPress={() => { change(item); setError(""); setConfirmacion(""); }}
          accessibilityRole="button"
          accessibilityState={{ selected: current === item }}
        >
          <Text style={[styles.chipText, current === item && styles.chipTextSelected]}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Volver">
            <Ionicons name="arrow-back" size={25} color={INK} />
          </Pressable>

          <View style={styles.brand}>
            <View style={styles.brandBadge}><Text style={styles.brandBadgeText}>UTP</Text></View>
            <Text style={styles.brandLabel}>Universidad Tecnológica del Perú</Text>
          </View>
          <Text style={styles.title}>SOLICITUD DE AUTORIZACIÓN DE ACCESO AL ESTACIONAMIENTO</Text>
          <Text style={styles.note}>
            Plantilla académica adaptada de las capturas de referencia. Texto por validar con el documento oficial de UTP.
          </Text>

          {DECLARACIONES.map((declaracion) => (
            <View key={declaracion.id} style={styles.declaration}>
              <Text style={styles.statement}>{declaracion.id}. {declaracion.description}</Text>
              {selector(respuestas[declaracion.id], (v) => updateRespuesta(declaracion.id, v))}
            </View>
          ))}

          <Text style={styles.sectionHeading}>4. Información sobre la autorización de uso de estacionamiento</Text>
          {CONDICIONES.map((texto) => (
            <View style={styles.bulletRow} key={texto}>
              <Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>{texto}</Text>
            </View>
          ))}

          <View style={styles.divider} />
          <Text style={styles.sectionHeading}>Política de privacidad</Text>
          <Text style={styles.note}>
            Falta incorporar aquí la versión íntegra y aprobada de la política de privacidad. No se debe publicar esta maqueta como documento oficial.
          </Text>
          <Pressable style={styles.acceptRow} onPress={() => { setAceptaPrivacidad((v) => !v); setError(""); }} accessibilityRole="checkbox" accessibilityState={{ checked: aceptaPrivacidad }}>
            <Ionicons name={aceptaPrivacidad ? "checkbox" : "square-outline"} size={23} color={aceptaPrivacidad ? RED : "#8C929C"} />
            <Text style={styles.acceptText}>Acepto los términos y la política de privacidad (simulación académica).</Text>
          </Pressable>

          <View style={styles.divider} />
          <Text style={styles.sectionHeading}>DATOS DEL USUARIO</Text>
          {labelValue("1. Fecha de solicitud", new Date().toLocaleDateString("es-PE"))}
          {labelValue("2. Apellidos y nombres", `${data.apellidos} ${data.nombres}`.trim())}
          {labelValue("3. DNI", data.dni)}
          {field("4. Elija su sede", sede, setSede, "Escribe tu sede UTP")}
          {labelValue("5. Correo institucional", data.correo)}
          <Text style={styles.label}>6. Elija su categoría</Text>
          {chips(CATEGORIAS, categoria, setCategoria)}
          {field("7. Carrera (estudiante) o área (colaborador)", carreraArea, setCarreraArea, "Escribe tu carrera o área")}
          {labelValue("8. Licencia de conducir", data.licencia)}

          <Text style={styles.sectionHeading}>9. Registrar vehículos</Text>
          <Text style={styles.hint}>Puedes registrar hasta 2 vehículos en esta maqueta.</Text>
          <Text style={styles.label}>Tipo de vehículo 1</Text>
          {chips(TIPOS, tipo1, setTipo1)}
          {labelValue("Placa del vehículo 1", data.placa)}
          {labelValue("Modelo del vehículo 1", data.modelo)}
          <Pressable style={styles.secondaryButton} onPress={() => setSegundo((v) => !v)}>
            <Ionicons name={segundo ? "remove-circle-outline" : "add-circle-outline"} size={19} color={RED} />
            <Text style={styles.secondaryText}>{segundo ? "Quitar segundo vehículo" : "Agregar segundo vehículo"}</Text>
          </Pressable>
          {segundo && (
            <View style={styles.secondVehicle}>
              <Text style={styles.label}>Tipo de vehículo 2</Text>
              {chips(TIPOS, tipo2, setTipo2)}
              {field("Placa del vehículo 2", placa2, setPlaca2, "Ej: ABC-123")}
            </View>
          )}

          <Text style={styles.sectionHeading}>10. ¿Persona con discapacidad?</Text>
          {selector(discapacidad, (v) => { setDiscapacidad(v); setError(""); }, "")}
          {discapacidad === "si" && labelValue("Código CONADIS", data.conadis, "Regístralo en Datos adicionales")}

          {!!error && <Text style={styles.error}>{error}</Text>}
          {!!confirmacion && <Text style={styles.confirmation}>{confirmacion}</Text>}
          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={() => router.back()}><Text style={styles.cancelText}>Cancelar</Text></Pressable>
            <Pressable style={styles.submitButton} onPress={enviar}><Text style={styles.submitText}>Enviar</Text></Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 23, paddingTop: 17, paddingBottom: 50 },
  backButton: { height: 40, width: 40, justifyContent: "center", marginBottom: 14 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 28 },
  brandBadge: { backgroundColor: RED, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  brandBadgeText: { color: "#FFFFFF", fontWeight: "900", fontSize: 21, letterSpacing: 2 },
  brandLabel: { flex: 1, color: INK, fontWeight: "700", fontSize: 12 },
  title: { color: INK, fontSize: 19, fontWeight: "800", lineHeight: 25, marginBottom: 14 },
  note: { color: "#717781", fontSize: 12, lineHeight: 18, marginBottom: 18 },
  declaration: { marginBottom: 23 },
  statement: { color: INK, fontSize: 14, lineHeight: 21, fontWeight: "500" },
  choices: { gap: 10, marginTop: 12, marginLeft: 5 },
  choiceRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, paddingVertical: 3 },
  choiceText: { flex: 1, color: "#454A55", lineHeight: 19, fontSize: 12 },
  sectionHeading: { color: INK, fontSize: 15, fontWeight: "800", lineHeight: 21, marginTop: 17, marginBottom: 14 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10, gap: 8 },
  bullet: { color: RED, fontSize: 18, lineHeight: 19 },
  bulletText: { flex: 1, color: "#4F5560", fontSize: 13, lineHeight: 20 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#E4E7EB", marginVertical: 18 },
  acceptRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 12 },
  acceptText: { flex: 1, color: INK, fontSize: 13, lineHeight: 19 },
  field: { marginBottom: 16 },
  label: { color: INK, fontSize: 12, fontWeight: "700", marginBottom: 7 },
  readOnly: { backgroundColor: "#F2F3F5", borderRadius: 6, minHeight: 40, justifyContent: "center", paddingHorizontal: 12 },
  value: { color: INK, fontSize: 13 },
  placeholder: { color: "#9297A1", fontSize: 12 },
  input: { borderWidth: 1, borderColor: "#CFD4DC", borderRadius: 6, minHeight: 42, paddingHorizontal: 12, color: INK, fontSize: 13 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  chip: { borderWidth: 1, borderColor: "#CFD4DC", paddingHorizontal: 11, paddingVertical: 8, borderRadius: 6 },
  chipSelected: { borderColor: RED, backgroundColor: "#FAECF0" },
  chipText: { color: "#5A606A", fontSize: 12 },
  chipTextSelected: { color: RED, fontWeight: "700" },
  hint: { fontSize: 12, color: "#717781", marginBottom: 17 },
  secondaryButton: { flexDirection: "row", alignItems: "center", gap: 7, paddingVertical: 12, marginBottom: 8 },
  secondaryText: { color: RED, fontWeight: "700", fontSize: 13 },
  secondVehicle: { padding: 13, borderWidth: 1, borderColor: "#E4E7EB", borderRadius: 8 },
  error: { color: RED, fontSize: 12, marginTop: 14, lineHeight: 19 },
  confirmation: { color: "#287A48", fontSize: 12, marginTop: 14, lineHeight: 19 },
  actions: { flexDirection: "row", gap: 12, marginTop: 26, justifyContent: "space-between" },
  cancelButton: { minWidth: 110, alignItems: "center", justifyContent: "center", height: 44, borderRadius: 7, borderWidth: 1, borderColor: RED },
  cancelText: { color: RED, fontWeight: "700", fontSize: 14 },
  submitButton: { minWidth: 110, alignItems: "center", justifyContent: "center", height: 44, borderRadius: 7, backgroundColor: RED },
  submitText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
});
