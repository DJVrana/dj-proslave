import React, { useEffect } from 'react';
import './EventDJ.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import eventDjImg from '../../assets/images/event-dj.webp'
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

function EventDJ() {
  const [cookies] = useCookies(['cookieConsent']);

  useEffect(() => {
    if (cookies.cookieConsent === true) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/dj-za-evente',
        title: "DJ za Evente"
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
            <h1 className='app-title-text mb-2'>DJ za Evente</h1>
          </div>
        </div>
      </section>
      <section className='service-section'>
        <div className="container">
          <div className='service-wrapper'>
            <div className='service-text-wrapper'>
              <h3 className='text-primary mb-3'>Profesionalna izvedba i fleksibilnost</h3>
              <p>
                Organizacija eventa zahtijeva savršenu koordinaciju svih
                elemenata, a glazba igra ključnu ulogu u stvaranju prave
                atmosfere. Naš DJ za evente prilagođava se specifičnim
                zahtjevima vašeg događaja, bilo da se radi o gala večeri,
                promociji, korporativnom događaju ili team buildingu.
              </p>
              <p>
                Naš DJ ima bogato iskustvo u radu s raznovrsnom publikom,
                razumije dinamiku različitih događanja i prilagođava se na
                licu mjesta. Kombinirajući glazbu koja odgovara tonu vašeg
                eventa, s prijelazima koji teku prirodno, osiguravamo
                neprekidno zadovoljstvo vaših gostiju.
              </p>
              <p>
                Naš tim koristi profesionalnu opremu i vrhunske tehničke
                sustave kako bi osigurao besprijekornu izvedbu. Bez obzira
                na veličinu ili vrstu eventa, možete se osloniti na našu
                stručnost za kreiranje nezaboravnog iskustva.
              </p>
            </div>
            <div className='service-img-wrapper'>
              <div className='service-img'>
                <img className='service-img-content' src={eventDjImg} alt='O nama' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventDJ;
