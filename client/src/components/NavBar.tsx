import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Box, Drawer, Divider, IconButton, Button } from "@mui/material"
import { Icon } from '@iconify/react';
import { useInterval } from '../components/useInterval'

const NavBar = () => {
  const [drawer, setDrawer] = useState(false);
  const [pumpState, setPumpState] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://io.adafruit.com/api/v2/nquochuy137/feeds/smartsocket-pump')
        .then(res => res.json())
        .then(json => {
            const lastPumpState = parseInt(json.last_value, 10);
            if (lastPumpState) {
                setPumpState(true)
            } else {
                setPumpState(false)
            }
        })
  }, [])

  

  return (
    <>
        <nav className='sticky'>
            <ul className="flex gap-2 w-full justify-between items-center p-10 bg-[#7ED7C1] text-white font-semibold py-0">
                <IconButton onClick={() => setDrawer(true)} className='grow-0'>
                    <Icon className='scale-[2]' icon="fa6-solid:bars" />
                </IconButton>
                <img src="/smartsocket.png" alt="image" className='scale-50'/>
                <div className='flex gap-2'>
                    <Button variant="contained" color={pumpState ? "error" : "success"} onClick={async () => { 
                        await fetch('http://localhost:8000/publish', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                topic: "nquochuy137/feeds/smartsocket-pump",
                                message: pumpState ? "0" : "1"
                            })
                        })
                        setPumpState(!pumpState);
                    }}>
                        {pumpState ? "Turn Off" : "Turn On"}
                    </Button>
                    <IconButton className='grow-0 h-fit'>
                        <Link to="/" className='scale-150 my-auto'>
                            <Icon icon="fa6-solid:house"/>
                        </Link>
                    </IconButton>
                </div>
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