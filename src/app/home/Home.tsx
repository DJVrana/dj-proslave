import React, { useEffect, useState } from 'react';
import './Home.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import aboutUsImg from '../../assets/images/closeup-dj-working-blue-light.webp'
import servicesImg from '../../assets/images/dj-playing-music-mixer.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faMaximize
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home() {
  const [listOfImages, setListOfImages] = useState([
    {
      name: "gallery01",
      alt: 'Galerija 1'
    },
    {
      name: "gallery02",
      alt: 'Galerija 2'
    },
    {
      name: "gallery03",
      alt: 'Galerija 3'
    },
    {
      name: "gallery04",
      alt: 'Galerija 4'
    },
    {
      name: "gallery05",
      alt: 'Galerija 5'
    },
    {
      name: "gallery06",
      alt: 'Galerija 6'
    },
  ]);

  const [hovered, setHovered] = useState('');

  const [isZoomActive, setIsZoomActive] = useState(false);
  const [activeZoomImg, setActiveZoomImg] = useState(0);

  function setZoomActive(index: number) {
    setIsZoomActive(true);
    setActiveZoomImg(index);
  }

  function setZoomImgPrev(index: number) {
    if (index === 0) {
      setActiveZoomImg(listOfImages.length - 1)
      return;
    }

    setActiveZoomImg(index - 1);
  }

  function setZoomImgNext(index: number) {
    if (index === listOfImages.length - 1) {
      setActiveZoomImg(0)
      return;
    }

    setActiveZoomImg(index + 1);
  }

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isZoomActive ? "hidden" : "auto";
    }
  }, [isZoomActive])

  const { scrollYProgress } = useScroll();

  function useParallax(value: MotionValue<number>) {
    return useTransform(value, [0, 1], ['0%', '100%']);
  }

  const y = useParallax(scrollYProgress);
  
  return (
    <>
      <section className='hero-section'>
        <motion.div
          className='hero'
          style={{ y }}
        >
          <div className='container'>
            <div className='hero-text-wrapper d-flex justify-content-center align-items-center'>
              <h1 className='hero-main-text mb-4'>Treba vam dobar <span className='hero-main-text-wrapper'>DJ</span></h1>
              <h3 className='hero-secondary-text mb-4'>Ne trebate više tražiti</h3>
              <div className='hero-phone-number-btn px-4'>
                <span>098 958 2676</span>
                <div className='hero-phone-number-btn-wrapper'></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className='home-landing-section'>
        <div className='container home-landing-section-wrapper'>
          <h2 className='home-landing-section-text-wrapper mb-4'>
            <span>Najteža stvar za stvaranje dobre zabave je glazba,</span>
            <span className='home-our-djs'>uz naše DJ-eve to više nije problem</span>
          </h2>
          <p className='home-landing-section-paragraph'>
            DJ Proslave vam omogućuje jednostavan pronalazak DJ-a za sve vaše
            događaje, naš tim će vam sa zadovoljstvom pomoći
          </p>
        </div>
      </section>
      <section className='home-infinity-scroll-section'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='home-infinity-scroll-main-text'>
              <h3>Raznovrsna glazba</h3>
            </div>
            <div className='home-infinity-scroll w-100 overflow-hidden'>
              <motion.div
                className='home-infinity-scroll-wrapper d-flex'
                animate={{ x: ["0%", "-100%"] }}
                transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
              >
                <p className='m-0 w-100'>Elektronička</p>
                <p className='m-0 w-100'>Narodnjaci</p>
                <p className='m-0 w-100'>Domaće</p>
                <p className='m-0 w-100'>EX-YU</p>
              </motion.div>
              <motion.div
                className='home-infinity-scroll-wrapper d-flex'
                animate={{ x: ["0%", "-100%"] }}
                transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
              >
                <p className='m-0 w-100'>Elektronička</p>
                <p className='m-0 w-100'>Narodnjaci</p>
                <p className='m-0 w-100'>Domaće</p>
                <p className='m-0 w-100'>EX-YU</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-about-us'>
        <div className="container">
          <div className='home-about-us-wrapper'>
            <div className='home-about-us-text-wrapper'>
              <h3>
                O Nama
              </h3>
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
              <Link to='/about' onClick={() => window.scrollTo(0, 0)} className='btn btn-primary mt-2'>Upoznaj nas</Link>
            </div>
            <div className='home-about-us-img-wrapper'>
              <div className='home-about-us-img'>
                <img src={aboutUsImg} alt='O nama' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-photo-gallery-section'>
        <div className='home-photo-gallery-section-bg'>
          <div className='container'>
            <div className='home-photo-gallery-section-wrapper'>
              <div className='home-photo-gallery-section-text'>
                <h3>Foto Galerija</h3>
              </div>
              <div className='home-photo-gallery-section-grid'>
                {listOfImages.map((img, key) => {
                  return (
                    <motion.div
                      onMouseEnter={() => setHovered(img.name)}
                      onMouseLeave={() => setHovered('')}
                      className='home-photo-gallery-section-img-wrapper'
                      key={key}
                      onClick={() => setZoomActive(key)}
                    >
                      <div className={
                        'home-photo-gallery-section-zoom-icon'
                        + ' ' +
                      (hovered === img.name && 'home-photo-gallery-section-zoom-icon-show')
                      }>
                        <FontAwesomeIcon icon={faMaximize} className='icon' />
                      </div>
                      <div className='home-photo-gallery-section-img'>
                        <img
                          src={require(`../../assets/images/gallery-optimized/${img.name}.webp`)}
                          alt={img.alt} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className='home-gallery-more-btn'>
                <Link to='/gallery' onClick={() => window.scrollTo(0, 0)} className='btn home-gallery-more-btn-wrapper'>Više</Link>
              </div>
              <div
                className={
                'home-zoom-carousel-modal'
                + ' ' +
                (isZoomActive && 'home-zoom-carousel-modal-show')
                }>
                <div className='home-zoom-carousel-modal-dialog px-2'>
                  {listOfImages.map((img, key) => {
                    return (
                      <div key={key} className={
                        'home-photo-gallery-zoom-img'
                        + ' ' +
                        (activeZoomImg === key ? 'home-photo-gallery-zoom-img-active' : '')
                        }>
                        { (activeZoomImg === key ||
                          activeZoomImg + 1 === key ||
                          activeZoomImg - 1 === key) &&
                          <>
                            <img
                              className='home-photo-gallery-zoom-img-wrapper'
                              src={require(`../../assets/images/gallery/${img.name}.jpg`)}
                              alt={img.alt} />
                            <div className='home-photo-gallery-zoom-prev-wrapper'>
                              <div
                                onClick={() => setZoomImgPrev(key)}
                                className='home-photo-gallery-zoom-prev'>
                                <FontAwesomeIcon icon={faChevronLeft} className='icon' />
                              </div>
                            </div>
                            <div className='home-photo-gallery-zoom-next-wrapper'>
                              <div
                                onClick={() => setZoomImgNext(key)}
                                className='home-photo-gallery-zoom-next'>
                                <FontAwesomeIcon icon={faChevronRight} className='icon' />
                              </div>
                            </div>
                            <div
                              onClick={() => setIsZoomActive(false)}
                              className='home-photo-gallery-zoom-close'>
                              <FontAwesomeIcon icon={faXmark} className='icon' />
                            </div>
                          </>
                        }
                      </div>
                    );
                  })}
                </div>
                <div onClick={() => setIsZoomActive(false)} className='home-modal-outside'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-services-section'>
        <div className="container">
          <div className='home-services-wrapper'>
            <div className='home-services-text-wrapper'>
              <h3>
                Usluge
              </h3>
              <p>
                U osnovnoj ponudi naših usluga imamo DJ za Svadbe, DJ za
                Proslave ili Event DJ. Nudimo Vam i iznajmljivanje ozvučenja
                i rasvjete posljednje generacije za Vašu proslavu.
              </p>
              <p>
                Svi naši nastupi mogu trajati od pola sata, do 12 sati. 
              </p>
              <Link to='/services' onClick={() => window.scrollTo(0, 0)} className='btn btn-primary mt-2'>Saznaj više</Link>
            </div>
            <div className='home-services-img-wrapper'>
              <div className='home-services-img'>
                <img
                  className='home-services-img-content'
                  src={servicesImg}
                  alt='Usluge' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
