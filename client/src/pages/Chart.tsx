import React, { useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { LineChart, CartesianGrid, Line, Legend, YAxis, XAxis } from 'recharts'
import { useInterval } from '../components/useInterval'

const Chart = () => {
  const [chartData, setChartData] = useState<{"Voltage": number, "Current": number }[]>([])

  function updateChartData() {
    const volt = Math.floor(Math.random() * 220)
    const current = Math.floor(Math.random() * 40)

    const tempData = Array.from(chartData)
    tempData.push({ "Voltage": volt, "Current": current })
    if (tempData.length > 10) tempData.shift()
    setChartData(tempData)
  }

  useInterval(updateChartData, 2000)

  return (
    <>
      <NavBar />
      <div className="background h-screen flex justify-center">
        <LineChart width={900} height={600} data={chartData} className='mt-6'>
          <CartesianGrid fill="#fff"/>
          <XAxis />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="Voltage" stroke="#8884d8"/>
          <Line type="monotone" dataKey="Current" stroke="red"/>
        </LineChart>
      </div>
      <Footer />
    </>
  )
}

export default Chart