import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import logo from '../../../assets/images/logo.png'
import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faAddressCard,
  faCamera,
  faHandshakeAngle,
  faMoneyCheckDollar,
  faAddressBook,
  IconDefinition,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Navbar() {

  const CustomNavLink = ( to: string, title: string ) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <NavLink
          className={
            'navbar-link'
            + ' ' +
            (match  && 'active')
          }
          onClick={() => window.scrollTo(0, 0)}
          to={to}>
        { title }
      </NavLink>
    )
  }

  const CustomNavLinkMobile = ( to: string, title: string, icon: IconDefinition ) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <NavLink
          className={
            'navbar-link-mobile'
            + ' ' +
            (match  && 'active-mobile')
          }
          onClick={() => { window.scrollTo(0, 0); closeMenu(); }}
          to={to}>
        <FontAwesomeIcon className='link-icon-mobile' icon={icon}></FontAwesomeIcon>
        <p>{ title }</p>
      </NavLink>
    )
  }

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  function openMenu() {
    setIsMenuOpened(true);
  }

  function closeMenu() {
    setIsMenuOpened(false);
  }

  const variants = {
    show: {
      x: "0%",
      display: 'block',
      transition: {
        ease: 'linear',
        duration: 0.4
      },
    },
    hide: {
      x: "100%",
      display: 'none',
      transition: {
        ease: 'linear',
        duration: 0.4
      },
    },
  };

  return (
    <header>
      <div className={isAtTop ? '' : 'header-scrolled'}>
        <div className='container'>
          <div
            className={
              'navbar-wrapper-web'
              + ' ' +
              (isAtTop && 'navbar-wrapper-web-not-scrolled')
            }
          >
            <Link className='navbar-brand h-100' to='/'>
              <img src={logo} alt='Logo' />
            </Link>
            <div className='navbar-links-wrapper'>
              { CustomNavLink('/', 'Početna') }
              { CustomNavLink('/about', 'O Nama') }
              { CustomNavLink('/gallery', 'Foto/Video') }
              { CustomNavLink('/services', 'Usluge') }
              { CustomNavLink('/price', 'Cijena') }
              { CustomNavLink('/contact', 'Kontakt') }
            </div>
          </div>
        </div>
      </div>
      <div className='header-scrolled'>
        <div className='container'>
          <div
            className='navbar-wrapper-mobile'
          >
            <Link className='navbar-brand h-100' to='/'>
              <img src={logo} alt='Logo' />
            </Link>
            { !isMenuOpened ?
              <div className='navbar-menu-wrapper' onClick={() => openMenu()}>
                <FontAwesomeIcon className='menu-icon' icon={faBars}></FontAwesomeIcon>
              </div>
              :
              <div className='navbar-menu-wrapper' onClick={() => closeMenu()}>
                <FontAwesomeIcon className='menu-close-icon' icon={faXmark}></FontAwesomeIcon>
              </div>
            }

            <motion.div
              variants={variants}
              initial={'hide'}
              animate={!isMenuOpened ? 'hide' : 'show'}
              className={
                'menu'
              }
            >
              <div className='menu-wrapper'>
                <div className='navbar-links-mobile-wrapper'>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/', 'Početna', faHome) }
                  </div>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/about', 'O Nama', faAddressCard) }
                  </div>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/gallery', 'Foto/Video', faCamera) }
                  </div>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/services', 'Usluge', faHandshakeAngle) }
                  </div>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/price', 'Cijena', faMoneyCheckDollar) }
                  </div>
                  <div className='navbar-link-mobile'>
                    { CustomNavLinkMobile('/contact', 'Kontakt', faAddressBook) }
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;