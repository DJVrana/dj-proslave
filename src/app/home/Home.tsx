import React, { useEffect, useState } from 'react';
import './Home.scss';
import { motion, MotionValue, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import aboutUsImg from '../../assets/images/closeup-dj-working-blue-light.webp';
import heroImg from '../../assets/images/hero.webp';
import eventsVideo from '../../assets/videos/events.mp4';
import privatePartiesVideo from '../../assets/videos/private-parties.mp4';
import weddingsVideo from '../../assets/videos/weddings.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faMinus,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import { getSeoMeta } from '../utils/seo';
import {
  FloatingEdgeVinyl,
  EdgeVuMeter,
  VinylEdgePeeker,
  FloatingHeadphones,
  FloatingMusicNote,
  EdgeSparkle,
  StageLaserBeams,
  AudioFrequencyWaveform,
  StageSpotlightSweep,
  CelebrationPartySparkles
} from '../general/ambient-background/AmbientBackground';

const reviewsData = [
  { author: "Ana Cvitanović", text: "Na maturalnoj napravljena top atmosfera, sve naše želje ispunjene i sve ispoštovano🔝🔝", date: new Date('2026-07-15') },
  { author: "Matija Matković", text: "Preporuka za vjenčanje! Svi zadovoljni i mladenci i djeca i bake i djedovi! Bilo je top od organizacije do realizacije!", date: new Date('2026-07-15') },
  { author: "Ivana Kuzek Vatavuk", text: "Sve pohvale DJ-u! Odlična glazba, super atmosfera, ali i dogovor i komunikacija prije svadbe. Preporuke! ☺️", date: new Date('2026-07-15') },
  { author: "kristina vučić", text: "Proslava mog 50-tog rođendana ne bi bila tulum stoljeca bez DJ Vrane...sve što smo dogovorili ispoštovao, mix pjesama savršen,prepoznaje kada treba mjenjati ritam tuluma, susretljiv prema željama ekipe, izuzetno profesionalan..sve u svemu za svaku preporuku 🫶", date: new Date('2026-04-15') },
  { author: "Ivan Maravić", text: "DJ za sve prigode, uvijek transparentan, pristupačan te se drži dogovora. Sve preporuke!", date: new Date('2026-03-15') },
  { author: "Maja Gabrek", text: "Odlican DJ, simpatičan, napravio super ugođaj i atmosferu, sve pohvale👏🏻👏🏻", date: new Date('2026-04-15') },
  { author: "Sonja Čičak", text: "top, odlicno pustao i svima se svidjelo!!", date: new Date('2026-04-15') },
  { author: "Mario Tica", text: "Odlican decko. Sve prema dogovoru. Za svaku preporuku.", date: new Date('2026-05-15') },
  { author: "Ana Šarić", text: "Za svaku preporuku!!! Top!!!", date: new Date('2026-03-15') },
  { author: "D S", text: "Najbolji DJ…sigurno se nećete požaliti ako ga bukirate..mi smo ga uzeli za vjenčanje trebao je dečko biti tu kao prateća glazba uz bend ali je totalno preuzeo show i napravio ludnicu..definitvno za svaku preporuku…i Btw dečko je super pristojan i ljubazan i dostupan u svakom trenu..", date: new Date('2026-08-09') },
  { author: "Ana Miha", text: "Preporuka za vjencanje!", date: new Date('2026-07-15') },
  { author: "Tara Ivišić", text: "Odličan DJ za maturalnu večer! Atmosfera je bila vrhunska od samog početka do kraja. Glazba je bila odlično odabrana, prilagođena svim generacijama i nitko nije ostao sjediti. DJ je znao podići raspoloženje, pratiti želje gostiju i …", date: new Date('2026-07-15') },
  { author: "Lauraa", text: "Sve pohvale za izvrsnu organizaciju i atmosferu koju je DJ stvorio na 18. rođendanu. Spoj profesionalnosti i odlične zabave. Svakako bismo ga ponovno angažirali.", date: new Date('2026-03-15') }
];

const allServicesData = [
  {
    id: 1,
    title: 'DJ za Proslave',
    desc: 'Učinite svoju proslavu nezaboravnom uz naše talentirane DJ-eve, prilagođene glazbene setove i energičnu atmosferu.',
    link: '/dj-za-proslave/',
    video: privatePartiesVideo
  },
  {
    id: 2,
    title: 'DJ za Evente',
    desc: 'Za bitne ceremonije i događaje osiguravamo širok glazbeni spektar i atmosferu koja podiže svaki event na višu razinu.',
    link: '/dj-za-korporativni-dogadaj/',
    video: eventsVideo
  },
  {
    id: 3,
    title: 'DJ za Svadbe',
    desc: 'Dodajte dašak magije Vašem vjenčanju. Profesionalna glazbena kulisa za noć ispunjenu plesom i nezaboravnim trenucima.',
    link: '/dj-za-vjencanja/',
    video: weddingsVideo
  },
  {
    id: 4,
    title: 'DJ + violina',
    desc: 'Elegancija klasičnog instrumenta uz moderne ritmove. Savršena kombinacija za profinjenu atmosferu i doček gostiju.',
    link: '/usluge/',
    video: weddingsVideo
  },
  {
    id: 5,
    title: 'DJ + saksofon',
    desc: 'Dodajte live energiju saksofona. Ovaj spoj stvara vrhunski klupski ili lounge ugođaj koji će gosti obožavati.',
    link: '/usluge/',
    video: eventsVideo
  },
  {
    id: 6,
    title: 'DJ + harmonika',
    desc: 'Idealan odabir za zagrijavanje atmosfere na svadbama i tradicionalnim proslavama. Spoj modernog i onog domaćeg.',
    link: '/usluge/',
    video: privatePartiesVideo
  }
];

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();

  if (diffInMonths <= 0) {
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (diffInDays < 7) return 'prije nekoliko dana';
    const weeks = Math.floor(diffInDays / 7);
    if (weeks <= 1) return 'prije tjedan dana';
    return `prije ${weeks} tjedna`;
  } else if (diffInMonths === 1) {
    return 'prije mjesec dana';
  } else if (diffInMonths < 5) {
    return `prije ${diffInMonths} mjeseca`;
  } else if (diffInMonths < 12) {
    return `prije ${diffInMonths} mjeseci`;
  } else {
    const years = Math.floor(diffInMonths / 12);
    if (years === 1) return 'prije godinu dana';
    if (years < 5) return `prije ${years} godine`;
    return `prije ${years} godina`;
  }
};

export function meta() {
  return getSeoMeta(
    "/",
    "DJ Proslave | Vrhunska Glazba za Vaše Događaje",
    "Pronađite profesionalnog DJ-a za vjenčanja, korporativne evente i privatne proslave. Vrhunska oprema i nezaboravna atmosfera u cijeloj Hrvatskoj.",
    "dj, dj proslave, dj za vjenčanja, dj za evente, najam dj-a"
  );
}
function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": `https://djproslave.com/#business`,
    "name": "DJ Proslave",
    "image": "https://djproslave.com/logo.png",
    "description": "Pronađite profesionalnog DJ-a za vjenčanja, korporativne evente i privatne proslave. Vrhunska oprema i nezaboravna atmosfera u cijeloj Hrvatskoj.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zagreb",
      "addressRegion": "Grad Zagreb",
      "addressCountry": "HR"
    },
    "priceRange": "$$",
    "url": "https://djproslave.com/",
    "sameAs": [
      "https://www.instagram.com/dj.proslave",
      "https://www.facebook.com/DJProslaveVjencanja/",
      "https://www.tiktok.com/@dj.proslave",
      "https://www.youtube.com/@dj.proslave"
    ]
  };

  const [displayedReviews, setDisplayedReviews] = useState<typeof reviewsData>([]);
  const [displayedServices, setDisplayedServices] = useState<typeof allServicesData>([]);

  useEffect(() => {
    const shuffledReviews = [...reviewsData].sort(() => 0.5 - Math.random());
    setDisplayedReviews(shuffledReviews.slice(0, 3));

    const shuffledServices = [...allServicesData].sort(() => 0.5 - Math.random());
    setDisplayedServices(shuffledServices.slice(0, 3));
  }, []);

  const { scrollYProgress } = useScroll();

  function useParallax(value: MotionValue<number>) {
    return useTransform(value, [0, 1], ['0%', '50%']);
  }

  const y = useParallax(scrollYProgress);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className='relative h-screen w-full flex items-center bg-[#0a0b10] overflow-hidden'>

        {/* Dynamic Concert Stage Lighting & Spotlight Effects */}
        <div className='absolute -top-24 right-10 md:right-1/4 w-[450px] md:w-[650px] h-[450px] md:h-[650px] bg-[radial-gradient(circle,rgba(255,223,115,0.22)_0%,rgba(194,167,90,0.08)_40%,transparent_70%)] blur-[100px] rounded-full pointer-events-none z-10 animate-hero-spotlight'></div>
        <div className='absolute top-1/4 -right-16 w-[350px] h-[700px] bg-gradient-to-b from-[color:var(--color-accent-gold)]/15 via-transparent to-transparent rotate-[-20deg] blur-[80px] pointer-events-none z-10 animate-hero-beam'></div>

        {/* Background Image on Right with Gradient Mask */}
        <div className='absolute inset-0 z-0'>
          <div
            className='absolute top-0 right-0 w-full md:w-4/5 h-full bg-cover bg-center md:bg-right'
            style={{
              backgroundImage: `url(${heroImg})`,
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 85%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 85%, black 100%)'
            }}
          />
          {/* Subtle dark overlay for contrast on smaller screens */}
          <div className='absolute inset-0 bg-gradient-to-r from-[#0a0b10] via-[#0a0b10]/90 md:via-[#0a0b10]/40 to-transparent z-10'></div>
        </div>

        {/* Content Container */}
        <div className='container relative z-20 pt-20 px-6 md:px-8'>
          <div className='max-w-2xl text-left'>

            {/* Dynamic live badge with equalizer bars */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-[color:var(--color-accent-gold)]/40 backdrop-blur-md shadow-[0_0_25px_rgba(194,167,90,0.25)] mb-5'
            >
              <div className='flex items-end gap-1 h-3.5'>
                <span className='w-1 bg-[color:var(--color-accent-gold)] rounded-full h-3 animate-eq-1'></span>
                <span className='w-1 bg-[color:var(--color-accent-gold)] rounded-full h-2 animate-eq-2'></span>
                <span className='w-1 bg-[color:var(--color-accent-gold)] rounded-full h-3.5 animate-eq-3'></span>
                <span className='w-1 bg-[color:var(--color-accent-gold)] rounded-full h-2 animate-eq-4'></span>
              </div>
              <span className='text-[color:var(--color-accent-gold)] uppercase tracking-[0.2em] text-xs font-bold'>
                Stvaramo atmosferu koja se pamti
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className='text-4xl md:text-6xl lg:text-[4.5rem] font-light tracking-wide text-white leading-[1.1] mb-6 drop-shadow-xl uppercase'
            >
              DJ za proslave, evente i slavlja<br />
              <span className='font-semibold text-[color:var(--color-accent-gold)]'>u Zagrebu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className='text-gray-300 text-lg md:text-xl font-light mb-10 max-w-md leading-relaxed drop-shadow-md'
            >
              Profesionalni DJ-evi za vjenčanja, rođendane, privatne i korporativne događaje. Vrhunska glazba, ozvučenje i rasvjeta za događaje koje ćete pamtiti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2'
            >
              <Link
                to='/kontakt/'
                onClick={() => window.scrollTo(0, 0)}
                className='relative overflow-hidden px-8 h-12 md:h-14 inline-flex items-center justify-center bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73] text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.03] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] leading-none pt-1 group'
              >
                <span className='relative z-10'>Zatražite ponudu</span>
                {/* Light sweep animation */}
                <span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-button-shimmer pointer-events-none'></span>
              </Link>
              <Link
                to='/o-nama/'
                onClick={() => window.scrollTo(0, 0)}
                className='px-8 h-12 md:h-14 inline-flex items-center justify-center bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white transition-colors backdrop-blur-sm leading-none pt-1'
              >
                Saznajte više
              </Link>
            </motion.div>
          </div>
        </div>

        {/* In-section floating edge DJ elements */}
        <div className='hidden xl:flex absolute left-4 2xl:left-10 top-1/3 z-20 flex-col items-center gap-4 animate-edge-float-1 pointer-events-none'>
          <FloatingEdgeVinyl size={52} />
          <FloatingMusicNote type="double" />
        </div>
        <div className='hidden xl:flex absolute right-4 2xl:right-10 top-1/3 z-20 flex-col items-center gap-4 animate-edge-float-2 pointer-events-none'>
          <FloatingHeadphones />
          <EdgeSparkle size={18} />
          <FloatingMusicNote type="single" />
        </div>
      </section>

      {/* 2. Video Section (HIGH VISUAL FOCUS) */}
      <section className='relative py-24 md:py-32 overflow-hidden bg-[#0a0b10]/40 backdrop-blur-sm flex flex-col items-center border-t border-white/5'>
        {/* Dynamic Concert Stage Laser Beams & Cinema Atmosphere */}
        <StageLaserBeams />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(194,167,90,0.15)_0%,transparent_70%)] blur-[120px] rounded-full z-0 pointer-events-none'></div>

        <div className='container relative z-10 flex flex-col items-center text-center'>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='mb-12 md:mb-16'
          >
            <h3 className='text-3xl md:text-5xl font-light tracking-wide text-white leading-tight mb-4 drop-shadow-lg'>
              Svaki događaj ima svoju <span className='font-semibold text-[color:var(--color-accent-gold)]'>priču</span>
            </h3>
            <p className='text-lg md:text-2xl text-gray-300 font-light drop-shadow-md'>
              Mi joj dajemo ritam koji će se pamtiti
            </p>
          </motion.div>

          {/* Kinematografski okvir s fokusom na video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className='w-full max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(194,167,90,0.15)] border border-white/20 relative z-20 bg-black'
          >
            {/* Live oznaka u kutu videa */}
            <div className='absolute top-4 left-4 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[color:var(--color-accent-gold)]/30 text-white text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(0,0,0,0.5)]'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-accent-gold)] opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-[color:var(--color-accent-gold)]'></span>
              </span>
              <span>Uživo s podija</span>
            </div>

            <video
              src={eventsVideo}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-auto object-cover aspect-video'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className='mt-12 md:mt-16'
          >
            <Link
              to='/galerija/'
              onClick={() => window.scrollTo(0, 0)}
              className='px-8 h-12 md:h-14 inline-flex items-center justify-center bg-[color:var(--color-accent-gold)] text-black font-bold uppercase tracking-widest text-sm hover:bg-[#ffdf73] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] leading-none pt-1 gap-4 group'
            >
              Pogledajte galeriju
              <FontAwesomeIcon icon={faChevronRight} className='transition-transform duration-500 group-hover:translate-x-1.5' />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. Usluge Section */}
      <section className='home-services-section relative py-24 md:py-40 overflow-hidden bg-[#0a0b10]/40 backdrop-blur-sm border-t border-white/5'>
        {/* Dynamic Stage Lighting & Glow */}
        <div className='absolute -bottom-24 left-10 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(194,167,90,0.14)_0%,transparent_70%)] blur-[130px] rounded-full z-0 pointer-events-none animate-ambient-drift-1'></div>
        <div className='absolute top-20 right-10 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(255,223,115,0.12)_0%,transparent_70%)] blur-[120px] rounded-full z-0 pointer-events-none animate-ambient-drift-2'></div>
        <div className='absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0'></div>

        {/* Dynamic Digital Audio Frequency Waveform */}
        <AudioFrequencyWaveform />

        <div className="container relative z-10">
          <div className='mb-16 md:mb-24 text-center flex flex-col items-center'>
            <h4 className='text-[color:var(--color-accent-gold)] font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-4 justify-center'>
              <span className='w-12 h-px bg-[color:var(--color-accent-gold)]'></span>
              Naše Usluge
              <span className='w-12 h-px bg-[color:var(--color-accent-gold)]'></span>
            </h4>
            <h3 className='text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white leading-tight'>
              Što nudimo za <br className="hidden md:block" />
              <span className='font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]'>
                vašu savršenu proslavu.
              </span>
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: "easeOut" }}
                className='group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[450px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/5 bg-[#1e1e1e] flex flex-col justify-end'
              >
                <div className='absolute inset-0 z-0'>
                  <video src={service.video} autoPlay loop muted playsInline className='w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10'></div>
                </div>

                <div className='relative z-20 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                  <h3 className='text-2xl md:text-3xl font-medium text-white mb-1'>{service.title}</h3>
                  <div className='max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-in-out overflow-hidden'>
                    <p className='text-gray-300 text-sm leading-relaxed mb-6'>
                      {service.desc}
                    </p>
                  </div>
                  <Link to={service.link} onClick={() => window.scrollTo(0, 0)} className='inline-flex items-center gap-3 text-[color:var(--color-accent-gold)] font-medium uppercase tracking-wider text-xs group/link mt-2'>
                    Saznajte više
                    <FontAwesomeIcon icon={faChevronRight} className='transition-transform duration-300 group-hover/link:translate-x-1' />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className='mt-16 md:mt-24 flex justify-center'>
            <Link to='/usluge/' onClick={() => window.scrollTo(0, 0)} className='inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold group shadow-lg'>
              Pregledajte sve usluge
              <FontAwesomeIcon icon={faChevronRight} className='transition-transform duration-500 group-hover:translate-x-1.5' />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Google Reviews Section (MOVED HERE BEFORE INTRO HOOK) */}
      <section className='relative py-24 md:py-32 overflow-hidden bg-[#0a0b10]/40 backdrop-blur-sm border-t border-white/5'>
        {/* Dynamic Golden Atmosphere & Pulse */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14)_0%,rgba(99,102,241,0.06)_45%,transparent_75%)] blur-[140px] rounded-full z-0 pointer-events-none animate-ambient-pulse'></div>
        <div className='absolute inset-0 bg-[radial-gradient(rgba(194,167,90,0.05)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0'></div>

        {/* In-section floating edge DJ elements */}
        <div className='hidden xl:flex absolute left-4 2xl:left-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 animate-edge-float-1 pointer-events-none'>
          <EdgeVuMeter label="CH 1" channel={1} />
          <FloatingMusicNote type="beam" />
        </div>
        <div className='hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 flex-col items-end animate-edge-float-2 pointer-events-none'>
          <VinylEdgePeeker side="right" />
          <EdgeSparkle size={18} className="mr-4 mt-2" />
        </div>

        <div className='container relative z-10'>
          <div className='text-center mb-16 md:mb-20 flex flex-col items-center'>
            <h4 className='text-[color:var(--color-accent-gold)] font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center justify-center gap-4'>
              <span className='w-12 h-px bg-[color:var(--color-accent-gold)]'></span>
              Recenzije
              <span className='w-12 h-px bg-[color:var(--color-accent-gold)]'></span>
            </h4>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <h3 className='text-4xl md:text-5xl font-bold tracking-wide text-white m-0'>
                Što kažu klijenti?
              </h3>
            </div>

            <div className='flex items-center justify-center gap-3 mb-2 mt-2'>
              <div className='flex gap-1 text-[#fbbc04] text-2xl'>
                {[...Array(5)].map((_, idx) => (
                  <FontAwesomeIcon key={idx} icon={faStar} />
                ))}
              </div>
              <span className='text-white font-bold text-xl'>5.0</span>
            </div>

            <p className='text-gray-400 font-light text-sm md:text-base mt-2'>
              Recenzije preuzete s Google Maps
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {displayedReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                className='bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-default'
              >
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl font-semibold text-white border border-white/10 shrink-0'>
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className='text-white font-medium'>{review.author}</h4>
                    <p className='text-gray-400 text-sm'>{getTimeAgo(review.date)}</p>
                  </div>
                </div>

                <div className='flex gap-1 text-[#fbbc04] mb-8 text-sm'>
                  {[...Array(5)].map((_, idx) => (
                    <FontAwesomeIcon key={idx} icon={faStar} />
                  ))}
                </div>

                <p className='text-gray-300 font-light leading-relaxed italic relative'>
                  <span className='text-4xl text-white/10 font-serif absolute -top-4 -left-2'>"</span>
                  <span className='relative z-10'>{review.text}</span>
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Intro Hook Section - Ključna stvar za stvaranje dobre glazbe (DODANA DINAMIKA I ANIMACIJE) */}
      <section className='home-landing-section relative overflow-hidden py-32 md:py-48 border-t border-white/5'>
        {/* Glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] bg-[color:var(--color-accent-gold)] opacity-[0.12] blur-[130px] rounded-full z-0 pointer-events-none'></div>

        {/* Dynamic Acoustic Vinyl Ripples */}
        <div className='absolute top-1/2 left-1/2 w-[750px] h-[750px] pointer-events-none z-0'>
          <div className='absolute top-1/2 left-1/2 w-[320px] h-[320px] rounded-full border border-[color:var(--color-accent-gold)]/30 animate-vinyl-ripple-1'></div>
          <div className='absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full border border-[color:var(--color-accent-gold)]/20 animate-vinyl-ripple-2'></div>
          <div className='absolute top-1/2 left-1/2 w-[680px] h-[680px] rounded-full border border-[color:var(--color-accent-gold)]/15 animate-vinyl-ripple-3'></div>
        </div>

        <div className='container relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='max-w-4xl mx-auto text-center relative'
          >
            {/* Dynamic Equalizer Visualizer Bars */}
            <div className='flex items-end justify-center gap-1.5 mb-8 h-8'>
              <span className='w-1.5 bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-full h-8 animate-eq-1'></span>
              <span className='w-1.5 bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-full h-5 animate-eq-2'></span>
              <span className='w-1.5 bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-full h-7 animate-eq-3'></span>
              <span className='w-1.5 bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-full h-4 animate-eq-4'></span>
              <span className='w-1.5 bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-full h-6 animate-eq-5'></span>
            </div>

            {/* Elegant large quote icon */}
            <div className='text-[color:var(--color-accent-gold)] opacity-30 text-8xl md:text-[12rem] font-serif absolute -top-16 md:-top-32 left-1/2 -translate-x-1/2 -z-10 select-none animate-pulse'>
              "
            </div>

            <h2 className='text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white leading-tight mb-8 drop-shadow-2xl'>
              Ključna stvar za stvaranje dobre zabave je <span className='italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]'>glazba</span>,
              <br className="hidden md:block" />
              <span className='block mt-4 text-2xl md:text-4xl text-gray-200'>uz naše DJ-eve to više nije problem.</span>
            </h2>

            <div className='w-24 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent-gold)] to-transparent mx-auto mb-8 opacity-70'></div>

            <p className='text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed'>
              Uz <strong className='text-white font-medium'>DJ Proslave</strong>, uživat ćete u glazbenim trenucima koji će oduševiti Vas i vaše goste. Dopustite nam da vaše želje pretvorimo u stvarnost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. O Nama Section */}
      <section className='relative py-24 md:py-40 overflow-hidden bg-[#0a0b10]/40 backdrop-blur-sm border-t border-b border-white/5'>
        {/* Dynamic Stage Glow & Ambient Grid */}
        <div className='absolute top-0 right-0 w-[550px] md:w-[750px] h-[550px] md:h-[750px] bg-[radial-gradient(circle,rgba(194,167,90,0.14)_0%,transparent_70%)] blur-[130px] rounded-full z-0 pointer-events-none animate-ambient-drift-1'></div>
        <div className='absolute bottom-0 left-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(99,102,241,0.09)_0%,transparent_70%)] blur-[110px] rounded-full z-0 pointer-events-none animate-ambient-drift-2'></div>
        <div className='absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none z-0'></div>

        {/* Dynamic Sweeping Stage Spotlight & Studio Grid */}
        <StageSpotlightSweep />

        <div className="container relative z-10">
          <div className='flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24'>

            {/* Apple Style Text Area */}
            <div className='w-full lg:w-1/2 flex flex-col justify-center'>
              <h4 className='text-[color:var(--color-accent-gold)] font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-4'>
                <span className='w-12 h-px bg-[color:var(--color-accent-gold)]'></span>
                O Nama
              </h4>
              <h3 className='text-4xl md:text-5xl lg:text-6xl mb-8 font-light tracking-wide text-white leading-tight md:leading-tight'>
                Iskustvo koje <br className="hidden md:block" />
                <span className='font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73]'>
                  radi razliku
                </span>
              </h3>

              <div className="space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                <p>
                  Tim profesionalnih DJ-eva i glazbenika s iskustvom u stvaranju atmosfere za najrazličitije vrste događaja – od vjenčanja i privatnih proslava do korporativnih evenata, maturalnih večeri i klubova.
                </p>
                <p>
                  Profesionalnost, pouzdanost i osjećaj za pravi trenutak temelj su svakog našeg angažmana. Svaki nastup prilagođavamo publici, prostoru i energiji događaja kako bi glazba od prvog do posljednjeg takta bila upravo tamo gdje treba biti.
                </p>
              </div>

              <div className="mt-12">
                <Link to='/o-nama/' onClick={() => window.scrollTo(0, 0)} className='inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold group shadow-lg'>
                  Upoznajte nas
                  <FontAwesomeIcon icon={faChevronRight} className='transition-transform duration-500 group-hover:translate-x-1.5' />
                </Link>
              </div>
            </div>

            {/* Apple macOS Style Window */}
            <div className='w-full lg:w-1/2 relative mt-10 lg:mt-0'>
              <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-tr from-[color:var(--color-accent-gold)] to-blue-600/30 opacity-20 blur-3xl rounded-full z-0 transition-opacity duration-700 hover:opacity-30"></div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#1e1e1e]/80 backdrop-blur-xl"
              >
                {/* macOS Title Bar */}
                <div className="h-10 md:h-12 bg-white/5 flex items-center px-4 md:px-6 border-b border-white/5">
                  <div className="flex gap-2 w-1/3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56] shadow-inner"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f] shadow-inner"></div>
                  </div>
                  <div className="w-1/3 text-center text-[10px] md:text-xs text-gray-500 font-medium tracking-wider flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faMinus} className="opacity-50 text-[8px]" />
                    <span>dj_proslave.webp</span>
                  </div>
                  <div className="w-1/3"></div>
                </div>

                {/* Content / Image inside the window */}
                <div className="relative overflow-hidden group bg-[#0a0b10]">
                  <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"></div>
                  <img
                    src={aboutUsImg}
                    alt='DJ na poslu'
                    className='w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]'
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Call to Action sekcija (ZADNJE) */}
      <section className='relative py-24 md:py-32 overflow-hidden bg-[#0a0b10]/40 backdrop-blur-sm border-t border-white/5'>
        {/* Climax Celebration Energy Aura & Pyro Sparkles */}
        <CelebrationPartySparkles />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18)_0%,rgba(255,223,115,0.08)_50%,transparent_75%)] blur-[130px] rounded-full z-0 pointer-events-none animate-ambient-pulse'></div>

        <div className='container relative z-10'>
          <div className='max-w-4xl mx-auto rounded-[2.5rem] p-8 md:p-16 border border-[color:var(--color-accent-gold)]/20 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group'>
            {/* Hover shine effect */}
            <div className='absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] transition-all duration-1000 ease-out group-hover:translate-x-full pointer-events-none'></div>

            <h2 className='text-3xl md:text-5xl font-light tracking-wide text-white mb-6 drop-shadow-lg'>
              Spremni za nezaboravnu zabavu?
            </h2>
            <p className='text-gray-300 text-base md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed'>
              Ne prepuštajte atmosferu slučaju. Rezervirajte svoj termin na vrijeme i osigurajte glazbeni spektakl o kojem će vaši gosti dugo pričati.
            </p>

            <div className='flex flex-col sm:flex-row justify-center items-center gap-6'>
              <a
                href='https://www.google.com/url?q=https%3A%2F%2Fwa.me%2F%2B3850989582676&amp;sa=D&amp;sntz=1&amp;usg=AOvVaw0S84ZOxexEzRm-QqzdAJmF'
                target="_blank"
                rel="noreferrer"
                className='px-10 py-4 rounded-full bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73] text-black font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center'
              >
                Rezervirajte termin
              </a>
              <Link
                to='/kontakt/'
                onClick={() => window.scrollTo(0, 0)}
                className='px-10 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center'
              >
                Kontaktirajte nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
