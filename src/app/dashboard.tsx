import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const COLORS = {
  primary: '#D32F2F',
  primaryDark: '#B71C1C',
  background: '#FFFFFF',
  cardBg: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#8A8A8A',
  border: '#EEEEEE',
  greenAccent: '#2E7D32',
};

export default function DashboardScreen() {
  const totalPlazas = 8;
  const disponibles = 6;
  const porcentajeLibre = Math.round((disponibles / totalPlazas) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.headerId}>U22223464</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.bellCircle}>
          <Text style={{ fontSize: 16 }}>🔔</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>¡Hola!</Text>

        {/* Tarjeta de reserva activa */}
        <View style={styles.reservationCard}>
          <View>
            <Text style={styles.reservationLabel}>Plaza A04</Text>
            <Text style={styles.reservationSub}>Vehículo: ABC-123</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.reservationSub}>Llegar antes de</Text>
            <Text style={styles.reservationLabel}>15:30</Text>
          </View>
        </View>

        {/* Tarjeta de cochera */}
        <View style={styles.parkingCard}>
          <Text style={styles.parkingTitle}>ESTACIONAMIENTO SUBTERRÁNEO</Text>
          <Text style={styles.parkingSubtitle}>Actualizado hace 3 seg</Text>

          <View style={styles.parkingRow}>
            <View>
              <Text style={styles.bigNumber}>{totalPlazas}</Text>
              <Text style={styles.bigNumberLabel}>Total de plazas</Text>
              <Text style={[styles.bigNumber, { marginTop: 12 }]}>{disponibles}</Text>
              <Text style={styles.bigNumberLabel}>Disponibles</Text>
            </View>

            <View style={styles.percentCircle}>
              <Text style={styles.percentText}>{porcentajeLibre}%</Text>
              <Text style={styles.percentLabel}>libre</Text>
            </View>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFFFFF' }]} />
              <Text style={styles.legendText}>Ocupados</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.greenAccent }]} />
              <Text style={styles.legendText}>Disponibles</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFB300' }]} />
              <Text style={styles.legendText}>Plaza reservada</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🅿️</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🚗</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🕐</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItemPrimary}><Text style={styles.navIconPrimary}>＋</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  avatarCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  headerId: { marginLeft: 8, fontWeight: '600', color: COLORS.textDark, fontSize: 13 },
  bellCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  greeting: { fontSize: 24, fontWeight: '700', color: COLORS.textDark, marginBottom: 12 },
  reservationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FCE9E9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  reservationLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  reservationSub: { fontSize: 12, color: COLORS.textGray, marginTop: 2 },
  parkingCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 18,
  },
  parkingTitle: { color: '#FFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },
  parkingSubtitle: { color: '#FFD9D9', fontSize: 11, marginTop: 2, marginBottom: 16 },
  parkingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bigNumber: { color: '#FFF', fontSize: 30, fontWeight: '800' },
  bigNumberLabel: { color: '#FFD9D9', fontSize: 12 },
  percentCircle: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 6, borderColor: COLORS.greenAccent,
    backgroundColor: '#FFFFFF10',
    alignItems: 'center', justifyContent: 'center',
  },
  percentText: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  percentLabel: { color: '#FFD9D9', fontSize: 12 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { color: '#FFF', fontSize: 10 },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { padding: 8 },
  navIcon: { fontSize: 22 },
  navItemPrimary: {
    backgroundColor: COLORS.primary,
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  navIconPrimary: { color: '#FFF', fontSize: 20, fontWeight: '700' },
});