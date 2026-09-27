import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import './Contact.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router';
import emailjs from '@emailjs/browser';
import { getSeoMeta } from '../utils/seo';
import {
  FloatingEdgeVinyl,
  EdgeVuMeter,
  VinylEdgePeeker,
  FloatingHeadphones,
  FloatingMusicNote,
  EdgeSparkle,
  AudioFrequencyWaveform
} from '../general/ambient-background/AmbientBackground';

export function meta() {
  return getSeoMeta(
    "kontakt",
    "Kontakt | DJ Proslave",
    "Zatražite besplatnu ponudu za vaš poseban dan! Kontaktirajte nas putem obrasca za vjenčanja, korporativne evente i privatne proslave.",
    "kontakt dj, zatraži ponudu, dj za vjenčanja kontakt, cijena dj"
  );
}
function Contact() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Kontaktirajte DJ Proslave",
    "description": "Kontakt obrazac za rezervaciju profesionalnog DJ-a.",
    "url": "https://djproslave.com/kontakt/",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "DJ Proslave",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zagreb",
        "addressCountry": "HR"
      }
    }
  };

  interface UserContactData {
    fullName: string,
    phone: string,
    email: string,
    date: string,
    eventType: string,
    location: string,
    numberOfGuests: string,
    howDidYouHear: string,
    additonalNotice: string
  }

  const [userContactData, setUserContactData] = useState<UserContactData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    eventType: '',
    location: '',
    numberOfGuests: '',
    howDidYouHear: '',
    additonalNotice: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const eventTypeRef = useRef<HTMLDivElement>(null);
  const eventTypeOptions = [
    "Vjenčanje",
    "Privatna Zabava",
    "Korporativno",
    "Javni dogadaj / Klub",
    "Ostalo"
  ];

  const [isHowDidYouHearOpen, setIsHowDidYouHearOpen] = useState(false);
  const howDidYouHearRef = useRef<HTMLDivElement>(null);
  const howDidYouHearOptions = [
    "Preporuka",
    "Instagram",
    "TikTok",
    "Facebook",
    "YouTube",
    "Web stranica",
    "Njuškalo",
    "Ostalo"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventTypeRef.current && !eventTypeRef.current.contains(event.target as Node)) {
        setIsEventTypeOpen(false);
      }
      if (howDidYouHearRef.current && !howDidYouHearRef.current.contains(event.target as Node)) {
        setIsHowDidYouHearOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [succesSubmit, setSuccessSubmit] = useState<string>('');
  const [errorSubmit, setErrorSubmit] = useState<string>('');

  useEffect(() => emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY!), []);

  async function submitForm() {
    setSuccessSubmit('');
    setErrorSubmit('');
    if (!validateForm()) {
      return;
    }
    let dateArray = userContactData.date.split("-");
    let date = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}.`;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID!,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID!,
        {
          fullName: userContactData.fullName,
          phone: userContactData.phone,
          email: userContactData.email,
          date: date,
          eventType: userContactData.eventType,
          location: userContactData.location,
          numberOfGuests: userContactData.numberOfGuests,
          howDidYouHear: userContactData.howDidYouHear,
          additonalNotice: userContactData.additonalNotice
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY!
      );
      setSuccessSubmit("Upit je uspješno poslan, naš tim će vam se javiti u najkraćem mogućem roku!");
      setUserContactData({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        eventType: '',
        location: '',
        numberOfGuests: '',
        howDidYouHear: '',
        additonalNotice: ''
      });
    } catch (err) {
      setErrorSubmit("Dogodila se pogreška tijekom slanja upita! Pokušajte ponovno ili nas kontaktirajte direktno putem telefona.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const [userContactDataValidation, setUserContactDataValidation] = useState<UserContactData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    eventType: '',
    location: '',
    numberOfGuests: '',
    howDidYouHear: '',
    additonalNotice: ''
  })

  function validateForm() {
    let fullName = validateField(userContactData.fullName, 'fullName', { required: true, min: 5, max: 35 });
    let phone = validateField(userContactData.phone, 'phone', { required: true, phone: true });
    let email = validateField(userContactData.email, 'email', { required: true, email: true });
    let date = validateField(userContactData.date, 'date', { required: true });
    let eventType = validateField(userContactData.eventType, 'eventType', { required: true });
    let location = validateField(userContactData.location, 'location', { required: true });
    let numberOfGuests = validateField(userContactData.numberOfGuests, 'numberOfGuests', { required: true });
    let howDidYouHear = validateField(userContactData.howDidYouHear, 'howDidYouHear', { required: true });
    let additonalNotice = validateField(userContactData.additonalNotice, 'additonalNotice', { max: 1000 });

    if (fullName && phone && email && date && eventType && location && numberOfGuests && howDidYouHear && additonalNotice) {
      return true;
    }
    return false;
  }

  function validateField(data: string, name: string, validate: { required?: boolean, min?: number, max?: number, email?: boolean, phone?: boolean }) {
    let validationMessage = '';

    if (validate.max && data.length > validate.max) {
      validationMessage = `Polje mora sadržavati maksimalno ${validate.max} znakova`;
    }
    if (validate.min && data.length < validate.min) {
      validationMessage = `Polje mora sadržavati minimalno ${validate.min} znakova`;
    }
    if (validate.phone && !/^[0-9+\-\s()]*$/.test(data)) {
      validationMessage = `Broj mobitela nije ispravan`;
    }
    if (validate.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data)) {
      validationMessage = `Email adresa nije ispravna`;
    }
    if (validate.required && !data) {
      validationMessage = 'Polje je obavezno';
    }

    setUserContactDataValidation(prevState => ({
      ...prevState,
      [name]: validationMessage
    }));

    return !validationMessage;
  }

  const [faq] = useState([
    { question: 'Odakle ste?', answer: 'Najviše nas je iz Zagreba, ali vremenom širimo svoj tim i na ostale gradove.' },
    { question: 'Kakvu glazbu puštate?', answer: 'Naš tim pokriva skoro sve žanrove glazbe. Od hitova 60-ih godina prošlog stoljeća, sve do hitova današnjice.' },
    { question: 'Koja je cijena nastupa?', answer: 'Cijena ovisi o datumu, lokaciji i trajanju nastupa. Slobodno nas kontaktirajte putem obrasca iznad za točnu ponudu prilagođenu Vašim potrebama.' },
    { question: 'Možemo li Vam poslati našu playlistu?', answer: 'Da naravno, potrudit ćemo se ispuniti svaku Vašu želju.' },
    { question: 'Nosite li svoje ozvučenje?', answer: 'Za 90% nastupa donosimo naše vrhunsko ozvučenje i rasvjetu, dok u posebnim slučajevima (npr. nastupi uz bend) možemo dogovoriti dijeljenje opreme.' },
    { question: 'Koliko dugo može trajati nastup?', answer: 'Naši nastupi se u potpunosti prilagođavaju Vašim potrebama – od kratkih party setova do cjelovečernjih vjenčanja.' },
    { question: 'Možete li miksati više žanrova glazbe?', answer: 'Naravno! Specijalizirani smo za glatke prijelaze između različitih žanrova kako bismo na podiju zadržali sve generacije gostiju.' },
  ]);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setActiveFaq(activeFaq === index ? null : index);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="bg-[#050508]/40 backdrop-blur-sm min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, faqSchema]) }}
      />

      {/* 1. HERO BANNER & CONTACT MODUL (Prema korisničkom predlošku) */}
      <section className='contact-form relative pt-28 md:pt-40 container mx-auto px-4'>
        <div className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none animate-float w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[radial-gradient(circle,var(--color-accent-gold),transparent)] top-[-50px] left-[-50px] md:left-[-100px] [animation-delay:0s]"></div>
        <div className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none animate-float w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[radial-gradient(circle,#ffdf73,transparent)] bottom-[-150px] right-[-50px] md:right-[-150px] [animation-delay:5s]"></div>
        <div className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none animate-float w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[radial-gradient(circle,var(--color-accent-gold),transparent)] top-[50%] right-[10%] [animation-delay:10s]"></div>
        <div className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none animate-float w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[radial-gradient(circle,#ffdf73,transparent)] top-[50%] left-[0] [animation-delay:10s]"></div>

        {/* In-section floating edge DJ elements */}
        <div className='hidden xl:flex absolute -left-16 2xl:-left-20 top-1/4 z-20 flex-col items-center gap-4 animate-edge-float-1 pointer-events-none'>
          <FloatingEdgeVinyl size={56} />
          <FloatingMusicNote type="double" />
        </div>
        <div className='hidden xl:flex absolute -right-16 2xl:-right-20 top-1/4 z-20 flex-col items-center gap-4 animate-edge-float-2 pointer-events-none'>
          <FloatingHeadphones />
          <EdgeVuMeter label="INBOX" channel={1} />
          <EdgeSparkle size={18} />
        </div>

        <header>
          <div className="relative text-center pt-8 pb-12 md:pb-24">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] md:w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[color:var(--color-accent-gold)] to-transparent"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73] bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-lg">
              Spremni za suradnju?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4 font-light">
              Zatražite informativnu ponudu, rezervirajte svoj datum ili postavite pitanje. Tu smo da Vam pomognemo stvoriti savršen događaj.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10 mb-20">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
                Kontakt <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]">Informacije</span>
              </h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[color:var(--color-accent-gold)] to-transparent mt-6 rounded-full"></div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center space-x-4 md:space-x-6 group p-4 -ml-4 rounded-3xl hover:bg-white/5 transition-colors duration-500">
                <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 rounded-full border border-[color:var(--color-accent-gold)]/20 bg-[color:var(--color-accent-gold)]/10 flex items-center justify-center text-[color:var(--color-accent-gold)] group-hover:scale-110 group-hover:bg-[color:var(--color-accent-gold)]/20 transition-all duration-300 shadow-lg shadow-black">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-1">Telefon</h3>
                  <p className="text-lg md:text-xl text-white font-light"><Link to="tel:+3850989582676" className="hover:text-[color:var(--color-accent-gold)] transition-colors">+385 098 958 2676</Link></p>
                </div>
              </div>

              <div className="flex items-center space-x-4 md:space-x-6 group p-4 -ml-4 rounded-3xl hover:bg-white/5 transition-colors duration-500">
                <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 rounded-full border border-[color:var(--color-accent-gold)]/20 bg-[color:var(--color-accent-gold)]/10 flex items-center justify-center text-[color:var(--color-accent-gold)] group-hover:scale-110 group-hover:bg-[color:var(--color-accent-gold)]/20 transition-all duration-300 shadow-lg shadow-black">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="truncate">
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-1">Email</h3>
                  <p className="text-lg md:text-xl text-white font-light truncate"><Link to="mailto:proslave.dj@gmail.com" className="hover:text-[color:var(--color-accent-gold)] transition-colors">proslave.dj@gmail.com</Link></p>
                </div>
              </div>

              <div className="flex items-center space-x-4 md:space-x-6 group p-4 -ml-4 rounded-3xl hover:bg-white/5 transition-colors duration-500">
                <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 rounded-full border border-[color:var(--color-accent-gold)]/20 bg-[color:var(--color-accent-gold)]/10 flex items-center justify-center text-[color:var(--color-accent-gold)] group-hover:scale-110 group-hover:bg-[color:var(--color-accent-gold)]/20 transition-all duration-300 shadow-lg shadow-black">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-1">Lokacija</h3>
                  <p className="text-lg md:text-xl text-white font-light">Zagreb, Hrvatska</p>
                  <p className="text-xs md:text-sm text-[color:var(--color-accent-gold)]/80 mt-1 italic font-light">Dostupni smo za nastupe širom Hrvatske.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t border-white/10 px-4 -mx-4">
              <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4 md:mb-6">Pratite nas</p>
              <div className="flex gap-4">
                <a href='https://www.instagram.com/dj.proslave' target='_blank' rel="noreferrer" aria-label="Instagram" className='group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:shadow-[0_0_20px_rgba(220,39,67,0.5)] hover:-translate-y-1'>
                  <FontAwesomeIcon icon={faInstagram} className='text-gray-400 group-hover:text-white text-xl transition-colors' />
                </a>
                <a href='https://www.youtube.com/@dj.proslave' target='_blank' rel="noreferrer" aria-label="YouTube" className='group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#FF0000] hover:border-transparent hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:-translate-y-1'>
                  <FontAwesomeIcon icon={faYoutube} className='text-gray-400 group-hover:text-white text-xl transition-colors' />
                </a>
                <a href='https://www.tiktok.com/@dj.proslave' target='_blank' rel="noreferrer" aria-label="TikTok" className='group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#000000] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1'>
                  <FontAwesomeIcon icon={faTiktok} className='text-gray-400 group-hover:text-white text-xl transition-colors' />
                </a>
                <a href='https://www.facebook.com/DJProslaveVjencanja/' target='_blank' rel="noreferrer" aria-label="Facebook" className='group relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:border-transparent hover:shadow-[0_0_20px_rgba(24,119,242,0.5)] hover:-translate-y-1'>
                  <FontAwesomeIcon icon={faFacebook} className='text-gray-400 group-hover:text-white text-xl transition-colors' />
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[color:var(--color-accent-gold)]/20 to-[color:var(--color-accent-gold)]/20 rounded-[2rem] blur-xl opacity-50 pointer-events-none"></div>

            <div className="relative bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
              <div className="mb-6 md:mb-10 text-center">
                <h2 className="text-2xl md:text-4xl font-light text-white mb-2">
                  Zatražite <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]">ponudu</span>
                </h2>
                <p className="text-sm md:text-base text-gray-400 font-light">Ispunite obrazac i javit ćemo vam se u najkraćem roku.</p>
              </div>

              <form id="kontakt-forma" className="scroll-mt-[220px] md:scroll-mt-[280px] space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Ime i Prezime <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={userContactData.fullName}
                      onChange={handleChange}
                      placeholder="Vaše ime i prezime..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300"
                    />
                    {userContactDataValidation.fullName && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Email adresa <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userContactData.email}
                      onChange={handleChange}
                      placeholder="Vaš email..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300"
                    />
                    {userContactDataValidation.email && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="date" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Željeni datum <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      lang="hr-HR"
                      min={new Date().toISOString().split('T')[0]}
                      value={userContactData.date}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300 [color-scheme:dark]"
                    />
                    {userContactDataValidation.date && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.date}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Broj Mobitela <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userContactData.phone}
                      onChange={handleChange}
                      placeholder="Vaš broj mobitela..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300"
                    />
                    {userContactDataValidation.phone && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.phone}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="eventType" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Vrsta događaja <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <div className="relative" ref={eventTypeRef}>
                      <div
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm md:text-base flex justify-between items-center cursor-pointer transition-all duration-300 ${isEventTypeOpen ? 'border-[rgba(212,175,55,1)] ring-1 ring-[rgba(212,175,55,1)]' : 'border-white/10 hover:border-white/20'}`}
                        onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                      >
                        <span className={userContactData.eventType ? 'text-white' : 'text-gray-500'}>
                          {userContactData.eventType || 'Odaberite vrstu događaja...'}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-gray-400 text-sm transition-transform duration-300 ${isEventTypeOpen ? 'rotate-180' : ''}`}
                        />
                      </div>

                      <AnimatePresence>
                        {isEventTypeOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-[#0a0a0d] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                          >
                            {eventTypeOptions.map((option, idx) => (
                              <div
                                key={idx}
                                className={`px-4 py-3 text-sm md:text-base cursor-pointer transition-colors ${userContactData.eventType === option ? 'bg-[rgba(212,175,55,0.15)] text-[rgba(212,175,55,1)]' : 'text-white hover:bg-white/5'}`}
                                onClick={() => {
                                  setUserContactData(prev => ({ ...prev, eventType: option }));
                                  setIsEventTypeOpen(false);
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {userContactDataValidation.eventType && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.eventType}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="location" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Lokacija <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={userContactData.location}
                      onChange={handleChange}
                      placeholder="Grad, mjesto ili naziv lokacije..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300"
                    />
                    {userContactDataValidation.location && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.location}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="numberOfGuests" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Broj gostiju <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <input
                      type="text"
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={userContactData.numberOfGuests}
                      onChange={handleChange}
                      placeholder="Npr. oko 100, 50-100..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300"
                    />
                    {userContactDataValidation.numberOfGuests && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.numberOfGuests}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="howDidYouHear" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Kako ste čuli za nas? <span className="text-[rgba(212,175,55,1)]">*</span></label>
                    <div className="relative" ref={howDidYouHearRef}>
                      <div
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm md:text-base flex justify-between items-center cursor-pointer transition-all duration-300 ${isHowDidYouHearOpen ? 'border-[rgba(212,175,55,1)] ring-1 ring-[rgba(212,175,55,1)]' : 'border-white/10 hover:border-white/20'}`}
                        onClick={() => setIsHowDidYouHearOpen(!isHowDidYouHearOpen)}
                      >
                        <span className={userContactData.howDidYouHear ? 'text-white' : 'text-gray-500'}>
                          {userContactData.howDidYouHear || 'Odaberite opciju...'}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-gray-400 text-sm transition-transform duration-300 ${isHowDidYouHearOpen ? 'rotate-180' : ''}`}
                        />
                      </div>

                      <AnimatePresence>
                        {isHowDidYouHearOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-[#0a0a0d] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                          >
                            {howDidYouHearOptions.map((option, idx) => (
                              <div
                                key={idx}
                                className={`px-4 py-3 text-sm md:text-base cursor-pointer transition-colors ${userContactData.howDidYouHear === option ? 'bg-[rgba(212,175,55,0.15)] text-[rgba(212,175,55,1)]' : 'text-white hover:bg-white/5'}`}
                                onClick={() => {
                                  setUserContactData(prev => ({ ...prev, howDidYouHear: option }));
                                  setIsHowDidYouHearOpen(false);
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {userContactDataValidation.howDidYouHear && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.howDidYouHear}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="additionalNotice" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Dodatan opis</label>
                    <textarea
                      id="additionalNotice"
                      name="additionalNotice"
                      value={userContactData.additonalNotice}
                      onChange={handleChangeTextArea}
                      placeholder="Vaša očekivanja, posebne želje ili bilo kakve dodatne informacije..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(212,175,55,1)] focus:ring-1 focus:ring-[rgba(212,175,55,1)] transition-all duration-300 resize-none"
                    ></textarea>
                    {userContactDataValidation.additonalNotice && <p className='text-red-400 text-xs m-0 font-medium'>{userContactDataValidation.additonalNotice}</p>}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => submitForm()}
                  className={`w-full py-4 mt-2 font-extrabold tracking-[0.1em] text-sm md:text-base inline-flex justify-center items-center bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73] text-black rounded-xl hover:scale-[1.02] transition-transform duration-300 uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isSubmitting ? 'Slanje upita...' : 'Pošalji Upit'}
                </button>

                {succesSubmit && (
                  <div className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded-lg flex items-center space-x-3 text-green-400 animate-pulse">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <p className="text-sm m-0">{succesSubmit}</p>
                  </div>
                )}

                {errorSubmit && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center space-x-3 text-red-400 animate-pulse">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm m-0">{errorSubmit}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SEKCIJA (Prema korisničkom predlošku) */}
      <section id="cesta-pitanja" className='faq pb-20 md:pb-40 scroll-mt-[100px] md:scroll-mt-[120px] bg-[#0a0a0d]/40 backdrop-blur-sm border-t border-white/5 relative overflow-hidden'>
        {/* Dynamic Digital Audio Frequency Waveform */}
        <AudioFrequencyWaveform className="opacity-35" />
        <div className="mt-20 md:mt-32 max-w-4xl mx-auto relative px-4 z-10">
          <div className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none animate-float w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[radial-gradient(circle,var(--color-accent-gold),transparent)] top-[-150px] left-[-200px] [animation-delay:0s]"></div>

          <header className="mx-auto max-w-2xl text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white mb-6">
              Često postavljana <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]">pitanja</span>
            </h2>
            <p className="mx-auto mt-4 md:mt-5 max-w-xl text-lg font-light leading-relaxed text-gray-400">
              Brzi odgovori na pitanja koja najčešće dobivamo. Ukoliko ne pronalazite odgovor, obratite nam se putem gornjeg obrasca.
            </p>
          </header>

          <div className="space-y-3 md:space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 md:px-6 md:py-5 flex justify-between items-center text-left focus:outline-none group"
                  aria-expanded={activeFaq === index}
                >
                  <h3 className={`text-base md:text-lg font-light pr-4 transition-colors duration-300 tracking-wide ${activeFaq === index ? 'text-[color:var(--color-accent-gold)]' : 'text-white'}`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-[color:var(--color-accent-gold)] shadow-[0_0_15px_rgba(212,175,55,0.4)] text-black rotate-180' : 'bg-white/5 text-gray-400'}`}>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </button>

                <div
                  className={`px-5 md:px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-96 pb-5 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pt-4 border-t border-white/5 text-sm md:text-base text-gray-400 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
