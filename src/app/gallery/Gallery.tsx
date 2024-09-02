import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faMaximize
} from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

function Gallery() {
  const [cookies] = useCookies(['cookieConsent']);

  useEffect(() => {
    if (cookies.cookieConsent === true) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/gallery',
        title: "Gallery"
      })
    }
  }, []);

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
    {
      name: "gallery07",
      alt: 'Galerija 7'
    },
    {
      name: "gallery08",
      alt: 'Galerija 8'
    },
    {
      name: "gallery09",
      alt: 'Galerija 9'
    },
    {
      name: "gallery10",
      alt: 'Galerija 10'
    },
    {
      name: "gallery11",
      alt: 'Galerija 11'
    },
    {
      name: "gallery12",
      alt: 'Galerija 12'
    }
  ]);

  const [listOfVideos, setListOfVideos] = useState([
    {
      src: "https://www.youtube-nocookie.com/embed/BHACKCNDMW8"
    },
    {
      src: "https://www.youtube-nocookie.com/embed/BHACKCNDMW8"
    },
    {
      src: "https://www.youtube-nocookie.com/embed/BHACKCNDMW8"
    }
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
            <h1 className='app-title-text mb-4'>Foto/Video</h1>
          </div>
        </div>
      </section>
      <section className='home-photo-gallery-section'>
        <div className='home-photo-gallery-section-bg'>
          <div className='container'>
            <div className='home-photo-gallery-section-wrapper'>
              <div className="gallery-section-grid">
                {listOfImages.map((img, key) => {
                  if (key <= 10) {
                    return (
                      <motion.div
                        onMouseEnter={() => setHovered(img.name)}
                        onMouseLeave={() => setHovered('')}
                        className={
                          'gallery-section-col-wrapper'
                          + ' ' +
                          `img${key + 1}`
                        }
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
                        <div className='gallery-section-img'>
                          <img
                            src={require(`../../assets/images/gallery-optimized/${img.name}.webp`)} 
                            alt={img.alt} />
                        </div>
                      </motion.div>
                    );
                  }
                })}
                <div className='photo gallery-photo-text'>
                  <div className='gallery-photo-text-wrapper'>
                    <h3>
                      Foto Galerija
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={
                'home-zoom-carousel-modal'
                + ' ' +
                (isZoomActive && 'home-zoom-carousel-modal-show')
                }>
                <div className='home-zoom-carousel-modal-dialog mx-2'>
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
      <section className='photo-gallery-video-section'>
        <div className='container'>
          <div className='home-photo-gallery-section-wrapper'>
            <div className='home-photo-gallery-section-text mb-4'>
              <h3>Video Galerija</h3>
            </div>
            <div className='home-photo-gallery-section-grid'>
              {listOfVideos.map((video, key) => {
                return (
                  <div key={key} className='photo-gallery-section-video'>
                    <iframe
                      src={video.src}>
                    </iframe>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
