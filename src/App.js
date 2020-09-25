import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import { SearchStorage } from './SearchContext';
import Detalhes from './components/pages/Detalhes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SearchStorage>
        <Routes>
          <Route path="/detalhes" element={<Detalhes />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </SearchStorage>
    </BrowserRouter>
  );
}

export default App;
