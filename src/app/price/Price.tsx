import React, { useState } from 'react';
import './Price.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

function Price() {

  const { scrollYProgress } = useScroll();

  function useParallax(value: MotionValue<number>) {
    return useTransform(value, [0, 1], ['0%', '100%']);
  }

  const y = useParallax(scrollYProgress);

  const [pricing, setPricing] = useState([
    {
      name: 'Rođendan',
      price: 'Od 120€',
    },
    {
      name: 'Zabava',
      price: 'Od 150€',
    },
    {
      name: 'Maturalna večer',
      price: 'Od 150€',
    },
    {
      name: 'Korporativni događaj',
      price: 'Od 200€',
    },
    {
      name: 'Nastup na eventima',
      price: 'Od 300€',
    },
    {
      name: 'Svadba-nastup do 1h',
      price: 'Od 150€',
    },
    {
      name: 'Svadba-nastup u više blokova',
      price: 'Od 300€',
    },
    {
      name: 'Svadba-nastup do 10h',
      price: 'Na upit',
    },
    {
      name: 'Ozvučenje',
      price: 'Od 50€',
    },
    {
      name: 'Rasvijeta',
      price: 'Od 30€',
    },
  ]);
  
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
            <h1 className='app-title-text mb-4'>Cijena</h1>
          </div>
        </div>
      </section>
      <section className='price'>
        <div className="container">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope="col">Vrsta</th>
                <th scope="col">Cijena</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((item, key) => {
                return (
                  <tr key={key}>
                    <th className='pricing-table-item'>{ item.name }</th>
                    <th className='pricing-table-item'>{ item.price }</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className='text-center'>
            * Sve navedene cijene su okvirne i informativnog karaktera.
            Formiranje točne cijene ovisi od lokacije, datuma, vremena
            trajanja nastupa i drugih detalja koje možete saznati
            kontaktirajući nas.
          </p>
        </div>
      </section>
    </>
  );
}

export default Price;
