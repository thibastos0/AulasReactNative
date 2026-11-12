import { useCallback, useEffect, useRef, useState } from 'react';
import Paho from 'paho-mqtt';
import { MQTT_CONFIG } from '../config';

export type SensorData = {
  temperature: number;
  humidity: number;
  qnh: number;
  led: boolean;
};

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export function useMqtt() {
  const clientRef = useRef<Paho.Client | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [data, setData] = useState<SensorData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const clientId = `app-${Math.random().toString(16).slice(2, 10)}`;
    const client = new Paho.Client(
      MQTT_CONFIG.host,
      MQTT_CONFIG.port,
      MQTT_CONFIG.path,
      clientId
    );
    clientRef.current = client;

    client.onConnectionLost = () => setStatus('disconnected');

    client.onMessageArrived = (message) => {
      try {
        const parsed = JSON.parse(message.payloadString) as SensorData;
        setData(parsed);
        setLastUpdate(new Date());
      } catch {
        console.warn('Mensagem inválida:', message.payloadString);
      }
    };

    client.connect({
      useSSL: true,
      timeout: 10,
      keepAliveInterval: 30,
      onSuccess: () => {
        setStatus('connected');
        client.subscribe(MQTT_CONFIG.topicSensor);   // assina a telemetria
      },
      onFailure: (err) => {
        console.warn('Falha MQTT:', err);
        setStatus('disconnected');
      },
    });

    return () => {
      if (client.isConnected()) client.disconnect();
    };
  }, []);

  // Publica ON/OFF no tópico de comando
  const setLed = useCallback((on: boolean) => {
    const client = clientRef.current;
    if (!client || !client.isConnected()) return;
    const msg = new Paho.Message(on ? 'ON' : 'OFF');
    msg.destinationName = MQTT_CONFIG.topicLedSet;
    client.send(msg);
  }, []);

  return { status, data, lastUpdate, setLed };
}