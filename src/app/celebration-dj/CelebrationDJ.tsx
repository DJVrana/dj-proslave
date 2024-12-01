import React, { useEffect } from 'react';
import './CelebrationDJ.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import djProslaveImg from '../../assets/images/dj-proslave.webp'
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

function CelebrationDJ() {
  const [cookies] = useCookies(['cookieConsent']);

  useEffect(() => {
    if (cookies.cookieConsent === true) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/dj-za-proslave',
        title: "DJ za Proslave"
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
            <h1 className='app-title-text mb-2'>DJ za Proslave</h1>
          </div>
        </div>
      </section>
      <section className='service-section'>
        <div className="container">
          <div className='service-wrapper'>
            <div className='service-text-wrapper'>
              <h3 className='text-primary mb-3'>Stvaranje savršene atmosfere</h3>
              <p>
                Bez obzira na to planirate li rođendan, godišnjicu, ili
                bilo koju drugu posebnu priliku, naš DJ za proslave
                donosi energiju i atmosferu koja se pamti. Uz pažljivo
                biranu glazbu prilagođenu vašem ukusu, stvaramo savršeno
                ozračje za vašu proslavu, bilo da želite elegantnu
                pozadinsku glazbu ili dinamičan plesni podij.
              </p>
              <p>
                Razumijemo koliko je glazba ključna za svaki događaj.
                Zbog toga svaki detalj dogovaramo s vama – od glazbenih
                žanrova do specifičnih pjesama koje želite čuti. Naš DJ
                donosi iskustvo i stručnost kako bi spojio vaš glazbeni
                ukus s potrebama gostiju, osiguravajući da se svi osjećaju
                dobrodošlo i inspirirano plesati.
              </p>
              <p>
                Naš tim koristi najsuvremeniju opremu kako bi osigurao
                vrhunsku kvalitetu zvuka. Uz profesionalan pristup i
                besprijekornu organizaciju, možete biti sigurni da će
                svaki trenutak vaše proslave biti popraćen savršenim
                ritmom.
              </p>
            </div>
            <div className='service-img-wrapper'>
              <div className='service-img'>
                <img className='service-img-content' src={djProslaveImg} alt='O nama' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CelebrationDJ;
