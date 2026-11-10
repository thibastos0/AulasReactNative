// Use o MESMO ID que colocou no sketch do Wokwi
const DEVICE_ID = 'thibastos';

export const MQTT_CONFIG = {
  host: 'broker.hivemq.com',
  port: 8884,          // WebSocket seguro (wss)
  path: '/mqtt',
  topicSensor: `iotdemo/${DEVICE_ID}/sensor`,
  topicLedSet: `iotdemo/${DEVICE_ID}/led/set`,
};