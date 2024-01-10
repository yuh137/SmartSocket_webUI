#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#define IS_PICO_W 0
#if IS_PICO_W == 0
#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#define WIFI_SSID "P432"
#define WIFI_PASS "23456789"
//setup Adafruit
#define AIO_SERVER "io.adafruit.com"
#define AIO_SERVERPORT 1883
//fill your username
#define AIO_USERNAME "dadn222"
//fill your key
#define AIO_KEY "aio_eaEO22o3lx45leFG8AweMqs2YPJt"

//setup MQTT
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

//setup publish
Adafruit_MQTT_Publish voltage_pub = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/voltage");
Adafruit_MQTT_Publish current_pub = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/current");
Adafruit_MQTT_Publish power_pub = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/power");
Adafruit_MQTT_Publish relay_pub = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/pump");


//setup subcribe
Adafruit_MQTT_Subscribe voltage_sub = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/voltage", MQTT_QOS_1);
Adafruit_MQTT_Subscribe current_sub = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/current", MQTT_QOS_1);
Adafruit_MQTT_Subscribe power_sub = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/power", MQTT_QOS_1);
Adafruit_MQTT_Subscribe relay_sub = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/pump", MQTT_QOS_1);
#endif
LiquidCrystal_I2C lcd(0x27, 16, 2);

void relaycallback(char* value, uint16_t len) {
  if (value[0] == '1') {
    digitalWrite(2, HIGH);
  } else if (value[0] == '0') {
    digitalWrite(2, LOW);
  }
}

uint8_t pzemCommand[8] = { 0x01, 0x04, 0x00, 0x00, 0x00, 0x0A, 0x70, 0x0D };
uint8_t pzemReturn[25];
uint16_t rawVoltage;
uint32_t rawCurrent;
uint32_t rawPower;

double power;
double current;
double voltage;

int led = 0;
int ledCount = 0;
int pzemCount = 0;
int pubCounter = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  digitalWrite(3, HIGH);
  Wire.begin();
  lcd.init();
  lcd.init();
  lcd.backlight();
  Serial.begin();
  Serial1.begin(9600, SERIAL_8N1);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("hello");
#if IS_PICO_W == 0
  //connect Wifi
  digitalWrite(LED_BUILTIN, HIGH);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting!");
    delay(100);
  }
  Serial.println("Connected!");

  //subscribe light feed
  relay_sub.setCallback(relaycallback);
  mqtt.subscribe(&voltage_sub);
  mqtt.subscribe(&current_sub);
  mqtt.subscribe(&relay_sub);
  mqtt.subscribe(&power_sub);

  //connect MQTT
  while (mqtt.connect() != 0) {
    Serial.print("Contacting server!");
    mqtt.disconnect();
    delay(100);
  }
  Serial.println("Server Connected");
#endif
}

void loop() {
  // put your main code here, to run repeatedly:
  mqtt.processPackets(1);
  ledCount++;
  if (ledCount == 100) {
    ledCount = 0;
    if (led == 0) {
      led = 1;
      digitalWrite(LED_BUILTIN, HIGH);
    } else {
      led = 0;
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
  pzemCount++;
  if (pzemCount == 100) {
    pzemCount = 0;
    Serial1.write(pzemCommand, 8);
    Serial1.readBytes(pzemReturn, 25);
    rawVoltage = pzemReturn[3];
    rawVoltage = rawVoltage << 8;
    rawVoltage += pzemReturn[4];
    voltage = (double)rawVoltage / 10;

    rawCurrent = pzemReturn[7];
    rawCurrent << 8;
    rawCurrent += pzemReturn[8];
    rawCurrent << 8;
    rawCurrent = pzemReturn[5];
    rawCurrent = rawCurrent << 8;
    rawCurrent += pzemReturn[6];
    current = (double)rawCurrent / 1000;

    rawPower = pzemReturn[11];
    rawPower << 8;
    rawPower += pzemReturn[12];
    rawPower << 8;
    rawPower = pzemReturn[9];
    rawPower << 8;
    rawPower += pzemReturn[10];
    power = (double)rawPower / 10;
    Serial.println("Voltage: " + String(voltage));
    Serial.println("Current: " + String(current));
    Serial.println("Power: " + String(power));
  }
#if IS_PICO_W == 0
  pubCounter++;
  if (pubCounter == 1000) {
    pubCounter = 0;
    voltage_pub.publish(voltage);
    current_pub.publish(current);
    power_pub.publish(power);
  }
#endif
  delay(10);
}
