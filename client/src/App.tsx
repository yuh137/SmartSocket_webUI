import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chart from './pages/Chart';
import History from './pages/History';
import PowerDisplay from './pages/PowerDisplay';
import { List, ListItem, Box, Drawer } from "@mui/material"
import { Icon } from '@iconify/react';

function App() {
  const [drawer, setDrawer] = useState(false);

  // const toggleDrawer = 
  // () =>
  //   (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event.type === 'keydown' &&
  //       ((event as React.KeyboardEvent).key === 'Tab' ||
  //         (event as React.KeyboardEvent).key === 'Shift')
  //     ) {
  //       return;
  //     }

  //     setDrawer(true);
  //   }; 


  return (
    <>
      <nav>
        <ul className="flex gap-2 w-full justify-center p-10 bg-[#7ED7C1] text-white font-semibold">
          <button onClick={() => setDrawer(true)}>
            <Icon className='scale-[2]' icon="fa6-solid:bars" />
          </button>
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
          >
            <List>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/chart">Chart</Link>
              </ListItem>
              <ListItem>
                <Link to="/history">History</Link>
              </ListItem>
              <ListItem>
                <Link to="/display">Power Display</Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/chart' element={<Chart />}/>
        <Route path='/history' element={<History />}/>
        <Route path='/display' element={<PowerDisplay />}/>
      </Routes>
    </>
  );
}

export default App;
