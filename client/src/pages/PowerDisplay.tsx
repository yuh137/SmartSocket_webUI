import React, { useState, useEffect } from 'react'
import { MQTTService } from '../class/MQTTService'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import { Icon } from "@iconify/react"
import DisplayStyles, { DisplayBackgrounds, DisplayIconColors, DisplayIcons, DisplayMessage, DisplayRippleEffects } from '../components/display-states.enum';

const PowerDisplay = () => {
  const [powerValue, setPowerValue] = useState(0);
  const [displayStyles, setDisplayStyles] = useState<DisplayStyles>({
    icon: DisplayIcons.SAFE,
    icon_color: DisplayIconColors.SAFE,
    rippleEffect: DisplayRippleEffects.GREEN,
    background: DisplayBackgrounds.SAFE,
    message: DisplayMessage.SAFE
  })
  const color = "pulse-green";
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
      <div className="background h-fit flex flex-col justify-center items-center">
          <div className={`h-[240px] w-[240px] ${displayStyles.background} rounded-full ${displayStyles.rippleEffect} flex flex-col justify-center items-center mt-24`}
               onClick={() => {
                setDisplayStyles({
                  icon: DisplayIcons.UNCONNECTED,
                  icon_color: DisplayIconColors.UNCONNECTED,
                  rippleEffect: DisplayRippleEffects.YELLOW,
                  background: DisplayBackgrounds.UNCONNECTED,
                  message: DisplayMessage.UNCONNECTED
                })
               }}   
          >
            <Icon icon={displayStyles.icon} className={`${displayStyles.icon_color} scale-[8]`}/>
            <div className={`font-bold ${displayStyles.icon_color} relative top-12 text-2xl`}>{displayStyles.message}</div>
          </div>
          <div className='flex gap-24 py-24'>
              <div className="flex flex-col py-4 gap-5 items-center w-44 h-44 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <div className='text-3xl'>Voltage</div>
                <div className='text-5xl'>3 V</div>
              </div>  
              <div className="flex flex-col py-4 gap-5 items-center w-44 h-44 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <div className='text-3xl'>Current</div>
                <div className='text-5xl'>3 A</div>
              </div>  
              <div className="flex flex-col py-4 gap-5 items-center w-44 h-44 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <div className='text-3xl'>Power</div>
                <div className='text-5xl'>9 W</div>
              </div>  
          </div>
      </div>
      <Footer />
    </>
  )
}

export default PowerDisplay