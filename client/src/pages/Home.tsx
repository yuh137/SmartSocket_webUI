import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="background h-screen">
        <body className='flex flex-col items-center gap-6'>
          <img src="/smartsocket-2.png" alt="logo-2" className='scale-75 grow-0 mt-20'/>
          <div className="w-fit flex gap-12">
            <Link to="/chart">
              <ButtonBase className="flex flex-col py-4 gap-5 items-center w-36 h-36 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <Icon icon="fa6-solid:chart-line" className='scale-[2.5]'/>
                <div className='text-xl'>Chart</div>
              </ButtonBase>  
            </Link>
            <Link to="/history">
              <ButtonBase className="flex flex-col py-4 gap-5 items-center w-36 h-36 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <Icon icon="fa6-solid:table-list" className='scale-[2.5]'/>
                <div className='text-xl'>History</div>
              </ButtonBase>  
            </Link>
            <Link to="/display">
              <ButtonBase className="flex flex-col py-4 gap-5 items-center w-36 h-36 !bg-gradient-to-br from-blue-400 to-blue-800 !rounded-lg !text-[#5FBDFF]">
                <Icon icon="fa6-solid:plug" className='scale-[2.5]'/>
                <div className='text-xl'>Dashboard</div>
              </ButtonBase>  
            </Link>
          </div>
        </body>
      </div>
      <Footer />
    </>
  )
}

export default Home