import { 
  ActivityIndicator,
  StyleSheet, 
  Switch, 
  Text, 
  View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useMqtt, ConnectionStatus } from './src/hooks/useMqtt';
import { useEffect, useState } from 'react';

const STATUS_LABEL: Record<ConnectionStatus, string> = {
  connecting: 'Conectando...',
  connected: 'Conectado',
  disconnected: 'Desconectado',
};

const STATUS_COLOR: Record<ConnectionStatus, string> = {
  connecting: '#f59e0b',
  connected: '#16a34a',
  disconnected: '#dc2626',
};

export default function App() {
  const { status, data, lastUpdate, setLed } = useMqtt();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (showIndicator) {
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showIndicator]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Painel IoT</Text>

      <View style={styles.statusRow}>
        <View style={[styles.dot, { backgroundColor: STATUS_COLOR[status] }]} />
        <Text style={styles.statusText}>{STATUS_LABEL[status]}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Temperatura</Text>
        <Text style={styles.value}>
          {data ? `${data.temperature.toFixed(1)} °C` : '--'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Umidade</Text>
        <Text style={styles.value}>
          {data ? `${data.humidity.toFixed(1)} %` : '--'}
        </Text>
      </View>

      <View style={[styles.card, styles.row]}>
        <View>
          <Text style={styles.label}>LED do ESP32</Text>
          <Text style={styles.small}>{data?.led ? 'Ligado' : 'Desligado'}</Text>
        </View>
        {showIndicator && <ActivityIndicator size="large" color="#3b82f6" />}
        <Switch
          value={data?.led ?? false}
          onValueChange={(value) => {
            setLed(value);
            setShowIndicator(true);
          }}
          disabled={status !== 'connected' || showIndicator}
        />
      </View>

      <Text style={styles.footer}>
        {lastUpdate
          ? `Última atualização: ${lastUpdate.toLocaleTimeString()}`
          : 'Aguardando dados do sensor...'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f3f4f6', 
    padding: 20,
    paddingBottom: 20,
    paddingTop: 60 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 8,
    marginTop: 20,
    textAlign: 'center'
  },
  statusRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20
  },
  dot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginRight: 8 
  },
  statusText: { 
    fontSize: 14,
    color: '#374151' 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 14, 
    padding: 20, 
    marginBottom: 14 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  label: { 
    fontSize: 14,
    fontWeight: '600', 
    color: '#6b7280' 
  },
  value: { 
    fontSize: 40,
    color: '#1f2937',
    fontWeight: '700', 
    marginTop: 4 
  },
  small: { 
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600', 
    marginTop: 4 
  },
  footer: { 
    textAlign: 'center', 
    color: '#9ca3af', 
    marginTop: 10 
  },
});