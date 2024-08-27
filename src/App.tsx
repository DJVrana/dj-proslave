import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './app/general/navbar/Navbar';
import Home from './app/home/Home';
import About from './app/about/About';
import Gallery from './app/gallery/Gallery';
import Services from './app/services/Services';
import Price from './app/price/Price';
import Contact from './app/contact/Contact';
import Footer from './app/general/footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/gallery" element={<Gallery />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/price" element={<Price />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;