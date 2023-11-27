import React from 'react'
import { Icon } from "@iconify/react"

const Footer = () => {
  return (
    <footer className='h-fit bg-[#7ED7C1] flex items-center text-[#333] py-6'>
      <div className="footer_left_panel flex flex-col w-2/3">
        <img src="/smartsocket.png" alt="" className='grow-0 max-h-24 w-fit scale-50 -translate-x-24'/>
        <div className="placeholder-text w-2/3 translate-x-20 mb-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum odio minima officia? Eveniet perferendis minus magni architecto voluptatem tenetur dolor rerum dicta iure, qui quis similique quo distinctio, quia hic.</div>
        <div className="social-icons flex text-3xl gap-2 translate-x-20">
          <Icon icon="mdi:facebook-box" className='cursor'/>
          <Icon icon="mdi:instagram" className='cursor'/>
          <Icon icon="mdi:twitter" className='cursor'/>
          <Icon icon="mdi:reddit" className='cursor'/>
        </div>
      </div>
      <div className="footer_right_panel">
        <ul className='flex flex-col gap-4'>
          <li className='text-2xl font-semibold'>
            Contact
          </li>
          <li>Telephone: (+84) 123456789</li>
          <li>Email: smartsocket@gmail.com</li>
          <li className='w-72'>Address: 268 Ly Thuong Kiet St, District 10, Ho Chi Minh City, Vietnam</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer