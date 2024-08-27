import React from 'react';
import './About.scss';
import aboutImg from '../../assets/images/dj-playing-music-mixer.webp'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

function About() {

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
          style={{ y }}
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
            <h1 className='app-title-text mb-4'>O nama</h1>
          </div>
        </div>
      </section>
      <section className='about-section'>
        <div className="container">
          <div className='about-wrapper'>
            <div className='about-text-wrapper'>
            <p>
                Dobrodošli na DJ Proslave! Mi smo strastveni tim DJ-eva
                posvećen stvaranju nezaboravnih glazbenih iskustava. Svaki
                član našeg tima ima jedinstveni stil, iskustvo i spreman je
                ispuniti svaku glazbenu želju.
              </p>
              <p>
                Naš fokus je na kvaliteti i profesionalnosti. Bez obzira
                na vrstu događaja, surađujemo s vama kako bismo osigurali
                da glazba bude upravo onakva kakvu ste zamislili.
              </p>
              <p>
                Dobrodošli na DJ Proslave! Mi smo strastveni tim DJ-eva
                posvećen stvaranju nezaboravnih glazbenih iskustava.
                Svaki član našeg tima ima jedinstveni stil, iskustvo i
                spreman je ispuniti svaku glazbenu želju.
              </p>
            </div>
            <div className='about-img-wrapper'>
              <div className='about-img'>
                <img className='about-img-content' src={aboutImg} alt='O nama' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
