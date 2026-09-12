import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  primary: '#D32F2F',
  background: '#FFFFFF',
  inputBg: '#F5F5F5',
  textDark: '#1A1A1A',
  textGray: '#8A8A8A',
  border: '#E0E0E0',
};

export default function LoginScreen() {
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: conectar con Auth Service (RF03) mas adelante
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.logoBox}>
          <Text style={styles.logoUtp}>UTP</Text>
          <Text style={styles.logoParking}>+parking</Text>
        </View>

        <Text style={styles.title}>Accede</Text>
        <Text style={styles.subtitle}>Ingresando tus datos de alumno</Text>

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. U22230562 o U71698835"
          placeholderTextColor={COLORS.textGray}
          value={codigo}
          onChangeText={setCodigo}
          autoCapitalize="none"
        />
        <Text style={styles.helper}>
          Ejemplo de usuario: U175XXXX (no digitar el @utp.edu.pe)
        </Text>

        <Text style={[styles.label, { marginTop: 18 }]}>Contraseña</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor={COLORS.textGray}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ color: COLORS.textGray, fontSize: 13 }}>
              {showPassword ? 'Ocultar' : 'Ver'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 40,
  },
  logoUtp: { color: '#FFFFFF', fontWeight: '800', fontSize: 18, letterSpacing: 1 },
  logoParking: { color: '#FFFFFF', fontWeight: '500', fontSize: 16, marginLeft: 4 },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.textGray, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  helper: { fontSize: 11, color: COLORS.textGray, marginTop: 6 },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: COLORS.textDark },
  forgotPassword: { color: COLORS.primary, fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 30 },
  primaryButton: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  secondaryButton: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.primary },
  secondaryButtonText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
});