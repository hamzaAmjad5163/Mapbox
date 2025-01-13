import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Map from './views/mapbox'; 

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} /> 
      </Routes>
    </div>
  );
}

export default App;
