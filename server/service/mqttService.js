const mqtt = require('mqtt');
const MQTT_HOST_NAME = "mqtt://io.adafruit.com:1883";
const MQTT_USERNAME = "nquochuy137";
const MQTT_PASSWORD = "aio_Xjed53JuHuW0sqxtzgaEYwmMfT8Z";

class MQTTService {
  constructor(host, username, password, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.messageCallback = messageCallback;
    this.username = username;
    this.password = password;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, {
      keepalive: 60,
      username: this.username,
      password: this.password,
    });

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    this.mqttClient.on("message", function (topic, message) {
      console.log(message.toString());
      if (this.messageCallback) this.messageCallback(topic, message);
    });

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }
}

let mqttClient = new MQTTService(MQTT_HOST_NAME, MQTT_USERNAME, MQTT_PASSWORD);
mqttClient.connect();

module.exports = mqttClient;