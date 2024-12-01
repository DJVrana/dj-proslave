import React, { useEffect } from 'react';
import './WeddingDJ.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import djVjencanjaImg from '../../assets/images/dj-vjencanja.webp'
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

function WeddingDJ() {
  const [cookies] = useCookies(['cookieConsent']);

  useEffect(() => {
    if (cookies.cookieConsent === true) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/dj-za-vjencanja',
        title: "DJ za Vjenčanja"
      })
    }
  }, []);

  const { scrollYProgress } = useScroll();

  function useParallax(value: MotionValue<number>) {
    return useTransform(value, [0, 1], ['0%', '100%']);
  }

  const y = useParallax(scrollYProgress);
  
  return (
    <>
            <section className='app-hero-section'>
        <motion.div
          className='app-hero'
        >
          <div className='container'>
            <div className='app-hero-wrapper d-flex justify-content-center align-items-center'>
            </div>
          </div>
        </motion.div>
      </section>
      <section className='title-section'>
        <div className="container">
          <div className='app-title-text-wrapper'>
            <h1 className='app-title-text mb-2'>DJ za Vjenčanja</h1>
          </div>
        </div>
      </section>
      <section className='service-section'>
        <div className="container">
          <div className='service-wrapper'>
            <div className='service-text-wrapper'>
              <h3 className='text-primary mb-3'>Glazba koja prati vašu ljubavnu priču</h3>
              <p>
                Vaše vjenčanje je jedan od najposebnijih dana u životu, a
                glazba je srce svakog trenutka. Naš DJ za vjenčanja
                pažljivo kreira playlistu koja odražava vašu ljubavnu
                priču – od emotivne ceremonije do nezaboravne večernje
                zabave.
              </p>
              <p>
                Prije velikog dana, radimo s vama kako bismo osigurali da
                svaki detalj odgovara vašim željama. Bilo da imate
                specifične pjesme za prvi ples, rezanje torte ili ulazak
                u salu, naš DJ će osigurati da svaki trenutak bude
                popraćen savršenom melodijom.
              </p>
              <p>
                Naš cilj je stvoriti atmosferu koja će razveseliti sve
                generacije gostiju – od najmlađih do najstarijih.
                Kombinacijom modernih hitova, klasika i romantičnih
                balada, osiguravamo da vaša svadba ostane urezana u
                sjećanja svih prisutnih kao dan pun ljubavi, radosti i
                plesa!
              </p>
            </div>
            <div className='service-img-wrapper'>
              <div className='service-img'>
                <img className='service-img-content' src={djVjencanjaImg} alt='O nama' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WeddingDJ;
