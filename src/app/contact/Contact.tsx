import React, { ChangeEvent, useState } from 'react';
import './Contact.scss';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faMinus,
  faPhone,
  faEnvelope,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

function Contact() {

  interface UserContactData {
    fullName: string,
    phone: string,
    email: string,
    date: string,
    eventType: string,
    additonalNotice: string
  }

  const [userContactData, setUserContactData] = useState<UserContactData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    eventType: '',
    additonalNotice: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserContactData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleChangeTextArea = (event: any) => {
    setUserContactData(prevState => ({
      ...prevState,
      additonalNotice: event.target.value
    }));
  }

  function submitForm() {
    if (!validateForm()) {
      return;
    }

    console.log("uspjesno")
  }

  const [userContactDataValidation, setUserContactDataValidation] = useState<UserContactData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    eventType: '',
    additonalNotice: ''
  })

  function validateForm() {
    
    let fullName = validateField(userContactData.fullName, 'fullName', { required: true, min: 5, max: 35 });
    let phone = validateField(userContactData.phone, 'phone', { required: true, phone: true });
    let email = validateField(userContactData.email, 'email', { required: true, email: true });
    let date = validateField(userContactData.date, 'date', { required: true });
    let eventType = validateField(userContactData.eventType, 'eventType', { required: true });
    let additonalNotice = validateField(userContactData.additonalNotice, 'additonalNotice', { max: 1000 });
    if (
      fullName &&
      phone &&
      email &&
      date &&
      eventType &&
      additonalNotice
    ) {
      return true;
    }

    return false;
  }

  function validateField(data: string, name: string, validate: { required?: boolean, min?: number, max?: number, email?: boolean, phone?: boolean }) {
    let validationMessage = '';

    if (validate.max) {
      if (data.length > validate.max) {
        validationMessage = `Polje mora sadržavati maksimalno ${validate.max} karaktera`;
      }
    }

    if (validate.min) {
      if (data.length < validate.min) {
        validationMessage = `Polje mora sadržavati minimalno ${validate.min} karaktera`;
      }
    }

    if (validate.phone) {
      if (!/^[0-9+\-\s()]*$/.test(data)) {
        validationMessage = `Broj mobitela nije ispravan`;
      }
    }

    if (validate.email) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data)) {
        validationMessage = `Email adresa nije ispravna`;
      }
    }
    
    if (validate.required) {
      if (!data) {
        validationMessage = 'Polje je obavezno';
      }
    }
    
    setUserContactDataValidation(prevState => ({
      ...prevState,
      [name]: validationMessage
    }));

    if (validationMessage) {
      return false;
    }

    return true;
  }

  const { scrollYProgress } = useScroll();

  function useParallax(value: MotionValue<number>) {
    return useTransform(value, [0, 1], ['0%', '100%']);
  }

  const y = useParallax(scrollYProgress);

  const [faq, setFaq] = useState([
    {
      question: 'Odakle ste?',
      answer: 'Najviše nas je iz Zagreba, ali vremenom širimo svoj tim i na ostale gradove.'
    },
    {
      question: 'Kakvu glazbu puštate?',
      answer: 'Naš tim pokriva skoro sve žanrove glazbe. Od hitova 60-ih godina prošlog vijeka, sve do muzike današnjice.'
    },
    {
      question: 'Koja je cijena nastupa?',
      answer: 'Nema fiksne cijene. Cijena nastupa ovisi o datumu, lokaciji i o trajanju samog nastupa. Informativne cijene možete pronaći na stranici Cijene'
    },
    {
      question: 'Možemo li Vam poslati našu playlistu?',
      answer: 'Da naravno, potrudit ćemo se ispuniti svaku Vašu želju.'
    },
    {
      question: 'Nosite li vaše ozvučenje?',
      answer: 'Da, za 90% nastupa mi donosimo naše ozvučenje, dok 10% ostavljamo za one nastupe gde postoje dvije muzike i uz zajednički dogovor koristimo ozvučenje od benda ili od lokala.'
    },
    {
      question: 'Koliko dugo može trajati nastup?',
      answer: 'Naš nastup može trajati od 30 minuta do 12 sati.'
    },
    {
      question: 'Možete li miksati više žanrova glazbe?',
      answer: 'Naravno! U jednoj noći znamo izmješati 5 različitih žanrova glazbe, ovisno o željama klijenta.'
    },
  ])

  const [faqShowed, setFaqShowed] = useState<number[]>([]);

  function showFaq(index: number) {
    setFaqShowed((prevState: number[]) => [...prevState, index]);
  }

  function hideFaq(index: number) {
    setFaqShowed((prevState: number[]) => prevState.filter(item => item !== index));
  }

  const variants = {
    show: {
      y: "0%",
      transition: {
        ease: 'linear',
        duration: 0.3
      },
    },
    hide: {
      y: "-100%"
    },
  };
  
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
            <h1 className='app-title-text mb-4'>Kontakt</h1>
          </div>
        </div>
      </section>
      <section className='contact'>
        <div className='container'>
          <div className='contact-wrapper'>
            <div className="contact-info">
              <div className='contact-info-text'>
                <h3>Kontakt</h3>
                <h4>DJ Proslave</h4>
              </div>
              <div className='contact-info-items'>
                <div className='contact-info-item'>
                  <FontAwesomeIcon className='contact-info-icon' icon={faPhone}></FontAwesomeIcon>
                  <p>Mob: 098 958 2676</p>
                </div>
                <div className='contact-info-item'>
                  <FontAwesomeIcon className='contact-info-icon' icon={faEnvelope}></FontAwesomeIcon>
                  <p>Email: djproslave@gmail.com</p>
                </div>
                <div className='contact-info-item'>
                  <FontAwesomeIcon className='contact-info-icon' icon={faGlobe}></FontAwesomeIcon>
                  <p>Web: djproslave.com</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3 className='mb-4'>
                Kontaktiraj nas
              </h3>
              <form className='form'>
                <div className='mb-4'>
                  <input
                    className='form-control'
                    placeholder='Ime i prezime *'
                    type="text"
                    name="fullName"
                    value={userContactData.fullName}
                    onChange={handleChange}
                  />
                  { userContactDataValidation.fullName &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.fullName}</p>
                    </div>
                  }
                </div>
                <div className='mb-4'>
                  <input
                    className='form-control'
                    placeholder='Mobitel *'
                    type="phone"
                    name="phone"
                    value={userContactData.phone}
                    onChange={handleChange}
                  />
                  { userContactDataValidation.phone &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.phone}</p>
                    </div>
                  }
                </div>
                <div className='mb-4'>
                  <input
                    className='form-control'
                    placeholder='Email *'
                    type="email"
                    name="email"
                    value={userContactData.email}
                    onChange={handleChange}
                  />
                  { userContactDataValidation.email &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.email}</p>
                    </div>
                  }
                </div>
                <div className='mb-4'>
                  <div className='form-control date-picker'>
                    { !userContactData.date &&
                      <div className='placeholder-date'>
                        <p className='m-0'>Datum *</p>
                      </div>
                    }
                    <input
                      className='form-control date-wrapper'
                      placeholder='Datum *'
                      type="date"
                      lang="hr-HR"
                      name="date"
                      value={userContactData.date}
                      onChange={handleChange}
                    />
                  </div>
                  { userContactDataValidation.date &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.date}</p>
                    </div>
                  }
                </div>
                <div className='mb-4'>
                  <input
                    className='form-control'
                    placeholder='Vrsta događaja *'
                    type="text"
                    name="eventType"
                    value={userContactData.eventType}
                    onChange={handleChange}
                  />
                  { userContactDataValidation.eventType &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.eventType}</p>
                    </div>
                  }
                </div>
                <div className='mb-4'>
                  <textarea
                    className='form-control contact-textarea'
                    placeholder='Dodatan opis/napomena... (neobavezno)'
                    name="additionalNotice"
                    value={userContactData.additonalNotice}
                    onChange={handleChangeTextArea}
                  />
                  { userContactDataValidation.additonalNotice &&
                    <div className='validateError'>
                      <p>{userContactDataValidation.additonalNotice}</p>
                    </div>
                  }
                </div>
                <a className='btn btn-primary' onClick={() => submitForm()}>Pošalji upit</a>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className='faq'>
        <div className="container">
          <div className='faq-wrapper'>
            <div className='faq-text-wrapper'>
              <h3>Često postavljana pitanja</h3>
              <p className='text-secondary'>
                Pronađite odgovore na vaša pitanja koje su i drugi
                korisnici postavljali. Ako ovdje nema odgovora na vaše
                pitanje kontaktirajte nas.
              </p>
            </div>
            <div>
              {faq.map((item, key) => {
                  return (
                    <div key={key} className='single-faq-item'>
                      <div className='single-faq-item-text-wrapper'>
                        <div className='single-faq-item-text-question'>
                          <p>{ item.question }</p>
                          { !faqShowed.includes(key) ? 
                        <div
                          onClick={() => showFaq(key)}
                          className='faq-icon-show-wrapper'
                        >
                          <FontAwesomeIcon className='faq-icon-show' icon={faChevronDown}></FontAwesomeIcon>
                        </div>
                        :
                        <div
                          onClick={() => hideFaq(key)}
                          className='faq-icon-hide-wrapper'
                        >
                          <FontAwesomeIcon className='faq-icon-hide' icon={faMinus}></FontAwesomeIcon>
                        </div>
                      }
                        </div>
                        { 
                        <div>
                          <motion.div
                            variants={variants}
                            initial={'hide'}
                            animate={!faqShowed.includes(key) ? 'hide' : 'show'}
                            className='single-faq-item-text-answer'
                          >
                            <p className='text-secondary pt-2'>
                              { item.answer }
                            </p>
                            <motion.div
                              className='faq-line-wrapper'
                              initial={{ y: '20px' }}
                            ></motion.div>
                          </motion.div>
                        </div>
                        }
                      </div>
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

export default Contact;
