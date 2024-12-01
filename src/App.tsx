import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

import Navbar from './app/general/navbar/Navbar';
import Home from './app/home/Home';
import About from './app/about/About';
import Gallery from './app/gallery/Gallery';
import Services from './app/services/Services';
import EventDJ from './app/event-dj/EventDJ';
import CelebrationDJ from './app/celebration-dj/CelebrationDJ';
import WeddingDJ from './app/wedding-dj/WeddingDJ';
import Contact from './app/contact/Contact';
import Footer from './app/general/footer/Footer';
import CookieConsent from './app/general/cookie-consent/CookieConsent';

function App() {
  const [cookies, setCookie] = useCookies(['cookieConsent']);

  function setCookieConsent(value: boolean) {
    if (value) {
      setCookie('cookieConsent', true, { maxAge: 24 * 60 * 60 * 365 });
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
        <CookiesProvider>
          <Navbar />
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/dj-za-evente" element={<EventDJ />}/>
            <Route path="/dj-za-proslave" element={<CelebrationDJ />}/>
            <Route path="/dj-za-vjencanja" element={<WeddingDJ />}/>
            <Route path="/contact" element={<Contact />}/>
          </Routes>
          <Footer />
        </CookiesProvider>
      </div>
      {
        (cookies.cookieConsent === undefined) &&
        <CookieConsent setCookieConsent={setCookieConsent} />
      }
    </>
  );
}

export default App;