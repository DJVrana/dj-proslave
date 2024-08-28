import React from 'react';
import './Footer.scss';
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faYoutube,
  faFacebook,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className='footer-section'>
        <div className='container'>
          <div className='footer-wrapper mb-3'>
            <div className='footer-brand'>
              <img src={logo} alt='Logo' />
            </div>
            <div className='footer-links links1'>
              <p className='text-secondary'>Istraži</p>
              <Link
                className='footer-link mb-2'
                onClick={() => window.scrollTo(0, 0)}
                to='/'
              >
                Početna
              </Link>
              <Link
                className='footer-link mb-2'
                onClick={() => window.scrollTo(0, 0)}
                to='/about'
              >
                  O nama
              </Link>
              <Link
                className='footer-link'
                onClick={() => window.scrollTo(0, 0)}
                to='/gallery'
              >
                Foto/Video
              </Link>
            </div>
            <div className='footer-links links2'>
              <p className='text-secondary'>Podrška</p>
              <Link
                className='footer-link mb-2'
                onClick={() => window.scrollTo(0, 0)}
                to='/contact'
              >
                Kontakt
              </Link>
              <Link
                className='footer-link mb-2'
                onClick={() => window.scrollTo(0, 0)}
                to='/services'
              >
                Usluge
              </Link>
              <Link
                className='footer-link'
                onClick={() => window.scrollTo(0, 0)}
                to='/price'
              >
                Cijena
              </Link>
            </div>
            <div className='footer-links social-media-links'>
              <p  className='text-secondary'>Društvene mreže</p>
              <div className='d-flex gap-3'>
                <div>
                  <a
                    className='social-media-link footer-link mb-3'
                    href='https://www.instagram.com/dj.proslave'
                    target='blank'>
                    <FontAwesomeIcon icon={faInstagram} className='icon' />
                  </a>
                  <a
                    className='social-media-link footer-link mb-3'
                    href='https://www.youtube.com/'
                    target='blank'>
                    <FontAwesomeIcon icon={faYoutube} className='icon' />
                  </a>
                </div>
                <div>
                  <a
                    className='social-media-link footer-link mb-3'
                    href='https://www.tiktok.com/'
                    target='blank'>
                    <FontAwesomeIcon icon={faTiktok} className='icon' />
                  </a>
                  <a
                    className='social-media-link footer-link'
                    href='https://www.facebook.com/'
                    target='blank'>
                    <FontAwesomeIcon icon={faFacebook} className='icon' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='copyright-wrapper'>
          <p className='m-0 text-secondary'>Copyright © 2024. Sva prava pridržana DJ Proslave</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
