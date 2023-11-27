import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chart from './pages/Chart';
import History from './pages/History';
import PowerDisplay from './pages/PowerDisplay';

function App() {
  return (
    <>
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
