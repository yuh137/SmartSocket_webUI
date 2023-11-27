import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Drawer, Divider, IconButton } from "@mui/material"
import { Icon } from '@iconify/react';

const NavBar = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <>
        <nav className='sticky'>
            <ul className="flex gap-2 w-full justify-between items-center p-10 bg-[#7ED7C1] text-white font-semibold py-0">
                <IconButton onClick={() => setDrawer(true)} className='grow-0'>
                    <Icon className='scale-[2]' icon="fa6-solid:bars" />
                </IconButton>
                <img src="/smartsocket.png" alt="image" className='scale-50'/>
                <IconButton className='grow-0 h-fit'>
                    <Link to="/" className='scale-150 my-auto'>
                        <Icon icon="fa6-solid:house"/>
                    </Link>
                </IconButton>
            </ul>
            <Drawer
                anchor='left'
                open={drawer}
                onClose={() => setDrawer(false)}
                >
                <Box
                    role="presentation"
                    onClick={() => setDrawer(false)}
                    onKeyDown={() => setDrawer(false)}
                    className='h-full bg-[#b9e1e0] w-[15vw]'
                >
                    <ul>
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/">
                        <Icon icon="fa6-solid:house" className='my-auto'/>
                        <div>Home</div>
                        </Link>
                    </li>
                    <Divider />
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/chart">
                        <Icon icon="fa6-solid:chart-line" className='my-auto'/>
                        <div>Chart</div>
                        </Link>
                    </li>
                    <Divider />
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/history">
                        <Icon icon="fa6-solid:table-list" className='my-auto'/>
                        <div>History</div>
                        </Link>
                    </li>
                    <Divider />
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/display">
                        <Icon icon="fa6-solid:plug" className='my-auto'/>
                        <div>Power display</div>
                        </Link>
                    </li>
                    <Divider />
                    </ul>
                </Box>
            </Drawer>
        </nav>
    </>
  )
}

export default NavBar