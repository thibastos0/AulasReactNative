#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// ---------- CONFIGURAÇÃO ----------
const char* WIFI_SSID = "Wokwi-GUEST";   // rede virtual do Wokwi
const char* WIFI_PASS = "";              // sem senha
const char* MQTT_HOST = "broker.hivemq.com";
const int   MQTT_PORT = 1883;

// INSERIR SEU ID ÚNICO (o mesmo que usará no app)
const char* TOPIC_SENSOR  = "iotdemo/thibastos/sensor";
const char* TOPIC_LED_SET = "iotdemo/thibastos/led/set";

#define DHT_PIN  4
#define DHT_TYPE DHT22
#define LED_PIN  26

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

bool ledOn = false;
unsigned long lastPublish = 0;

// Chamada quando chega uma mensagem no tópico assinado
void onMessage(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) msg += (char)payload[i];
  Serial.printf("Comando recebido: %s\n", msg.c_str());

  if (msg == "ON")  ledOn = true;
  if (msg == "OFF") ledOn = false;
  digitalWrite(LED_PIN, ledOn ? HIGH : LOW);
}

void connectWifi() {
  Serial.print("Conectando ao Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASS, 6);   // canal 6 acelera a conexão no Wokwi
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println(" OK");
}

void connectMqtt() {
  while (!mqtt.connected()) {
    String clientId = "esp32-" + String(random(0xffff), HEX);
    Serial.print("Conectando ao broker MQTT...");
    if (mqtt.connect(clientId.c_str())) {
      Serial.println(" OK: " + clientId);
      mqtt.subscribe(TOPIC_LED_SET);     // escuta comandos do app
    } else {
      Serial.printf(" falhou (rc=%d). Tentando de novo...\n", mqtt.state());
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  connectWifi();
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  mqtt.setCallback(onMessage);
}

void loop() {
  if (!mqtt.connected()) connectMqtt();
  mqtt.loop();                            // mantém a conexão e processa mensagens

  if (millis() - lastPublish >= 3000) {   // a cada 3 segundos
    lastPublish = millis();

    float t = dht.readTemperature();
    float h = dht.readHumidity();
    if (isnan(t) || isnan(h)) {
      Serial.println("Falha na leitura do DHT22");
      return;
    }

    char json[100];
    snprintf(json, sizeof(json),
             "{\"temperature\":%.1f,\"humidity\":%.1f,\"led\":%s}",
             t, h, ledOn ? "true" : "false");

    mqtt.publish(TOPIC_SENSOR, json);
    Serial.println(json);
  }
}