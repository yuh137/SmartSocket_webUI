import React, { useState, useEffect } from 'react'
import * as mqtt from "mqtt"
import { MQTTService } from '../class/MQTTService'
import NavBar from '../components/NavBar'

const PowerDisplay = () => {
  const [powerValue, setPowerValue] = useState(0);
  // const type = typeof process.env.REACT_APP_MQTT_HOST
  const MQTT_HOST = "mqtt://io.adafruit.com:1883";
  const MQTT_USERNAME = "nquochuy137";
  const MQTT_PASSWORD = "aio_wtwT13k6vi2GsvxMLrJp39YA3HkF";

  useEffect(() => {
    const mqttclient = new MQTTService(MQTT_HOST, MQTT_USERNAME, MQTT_PASSWORD)

    mqttclient.connect();
    mqttclient.subscribe("nquochuy137/feeds/nest-test");
    console.log(mqttclient.messageCallback())
  })

  return (
    <>
      <NavBar />
    </>
  )
}

export default PowerDisplay