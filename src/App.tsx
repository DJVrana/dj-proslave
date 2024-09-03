import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

import Navbar from './app/general/navbar/Navbar';
import Home from './app/home/Home';
import About from './app/about/About';
import Gallery from './app/gallery/Gallery';
import Services from './app/services/Services';
import Price from './app/price/Price';
import Contact from './app/contact/Contact';
import Footer from './app/general/footer/Footer';
import CookieConsent from './app/general/cookie-consent/CookieConsent';

function App() {
  const [cookies, setCookie] = useCookies(['cookieConsent']);

  function setCookieConsent(value: boolean) {
    if (value) {
      setCookie('cookieConsent', true);
    } else {
      setCookie('cookieConsent', false, { maxAge: 24 * 60 * 60 * 7});
    }
  }

  useEffect(() => {
    if (cookies.cookieConsent === true) {
      ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID!);
    }
  }, [cookies.cookieConsent]);

  return (
    <>
      <div className='web'>
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
      </div>
      {
        (cookies.cookieConsent === undefined) &&
        <CookieConsent setCookieConsent={setCookieConsent} />
      }
    </>
  );
}

export default App;