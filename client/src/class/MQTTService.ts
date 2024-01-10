import mqtt from "mqtt";

export class MQTTService {
    host: string;
    username: string;
    password: string;
    mqttClient: mqtt.MqttClient | null;

    constructor(host: string, username: string, password: string) {
        this.mqttClient = null;
        this.host = host;
        this.username = username;
        this.password = password;
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host, {
            keepalive: 60,
            clientId: "random",
            protocolId: 'MQTT',
            username: this.username,
            password: this.password
        })
    }

    subscribe(topic: string) {
        this.mqttClient?.subscribe(topic);

        console.log("Connected to feed: " + topic);
    }

    publish(topic: string, messgae: string) {
        this.mqttClient?.publish(topic, messgae);
    }

    messageCallback() {
        this.mqttClient?.on("message", (topic, message) => {
            console.log(topic, message);
        })
    }
}