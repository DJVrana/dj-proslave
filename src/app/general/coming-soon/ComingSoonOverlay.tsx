import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faCalendarCheck,
  faEye,
  faEyeSlash,
  faMusic,
  faWandMagicSparkles,
  faHeadphones,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ENABLE_COMING_SOON, COMING_SOON_CONFIG } from './comingSoonConfig';
import logo from '../../../assets/images/logo.png';
import { FloatingEdgeVinyl } from '../ambient-background/AmbientBackground';

/**
 * =========================================================================
 * 🎧 COMING SOON / STRANICA U IZRADI - OVERLAY KOMPONENTA
 * =========================================================================
 * 
 * ℹ️ KAKO ISKLJUČITI OVAJ OVERLAY:
 * 1. Otvorite datoteku `src/app/general/coming-soon/comingSoonConfig.ts`
 * 2. Promijenite `ENABLE_COMING_SOON = true;` u `ENABLE_COMING_SOON = false;`
 * 
 * (Ili u `src/app/root.tsx` jednostavno zakomentirajte `<ComingSoonOverlay />`)
 * =========================================================================
 */
export default function ComingSoonOverlay() {
  // Ako je u konfiguraciji isključen, ne renderira se apsolutno ništa
  if (!ENABLE_COMING_SOON) {
    return null;
  }

  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Provjera spremljenog stanja za privremeni pregled (SSR-safe)
  useEffect(() => {
    setMounted(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hasPreviewParam = urlParams.get('preview') === 'true';
      const storedDismissed = sessionStorage.getItem('dj_coming_soon_preview') === 'true';
      if (hasPreviewParam || storedDismissed) {
        setIsDismissed(true);
      }
    } catch {
      // Ignoriraj SSR greške
    }
  }, []);

  // Blokiranje skrolanja pozadinske stranice dok je overlay aktivan
  useEffect(() => {
    if (!mounted) return;
    if (!isDismissed) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isDismissed, mounted]);

  const handleDismissPreview = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('dj_coming_soon_preview', 'true');
    } catch {
      // ignoriraj
    }
  };

  const handleRestoreOverlay = () => {
    setIsDismissed(false);
    try {
      sessionStorage.removeItem('dj_coming_soon_preview');
    } catch {
      // ignoriraj
    }
  };

  // Visine ekvilajzera za glazbeni val
  const soundWaveHeights = [
    [10, 28, 14, 34, 12],
    [24, 12, 38, 16, 26],
    [16, 36, 20, 28, 14],
    [32, 18, 28, 38, 22],
    [18, 30, 12, 26, 16],
    [28, 14, 36, 18, 30],
    [12, 24, 16, 32, 10],
  ];

  return (
    <>
      <AnimatePresence>
        {!isDismissed && (
          <motion.div
            key="coming-soon-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between items-center px-4 py-6 sm:py-8 md:py-10 bg-[#06070a]/95 backdrop-blur-2xl overflow-y-auto overflow-x-hidden text-white select-none"
            style={{ overscrollBehavior: 'contain' }}
            role="dialog"
            aria-modal="true"
            aria-label="Stranica u izradi"
          >
            {/* Dekorativni pozadinski sjaj i stage rasvjeta */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(194,167,90,0.18)_0%,transparent_70%)] blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(194,167,90,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

            {/* Dekorativne rotirajuće vinyl ploče na rubovima (vidljive na većim ekranima) */}
            <div className="hidden lg:block absolute top-12 left-10 pointer-events-none opacity-40 hover:opacity-80 transition-opacity duration-500">
              <FloatingEdgeVinyl size={90} />
            </div>
            <div className="hidden lg:block absolute bottom-12 right-10 pointer-events-none opacity-40 hover:opacity-80 transition-opacity duration-500">
              <FloatingEdgeVinyl size={100} reverse />
            </div>

            {/* GORNJI HEADER: Logo & Status oznaka */}
            <header className="relative z-10 w-full max-w-4xl flex items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[color:var(--color-accent-gold)] to-[#ffdf73] rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition duration-500" />
                  <img
                    src={logo}
                    alt="DJ Proslave Logo"
                    className="relative h-11 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(194,167,90,0.35)]"
                  />
                </div>
              </div>

              {/* Status "Rezervacije u tijeku" */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner text-[11px] sm:text-xs font-medium text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">Status:</span>
                <span className="text-[color:var(--color-accent-gold)] font-semibold">Rezervacije 2025/2026 u tijeku</span>
              </div>
            </header>

            {/* SREDIŠNJA KARTICA: Glavni Coming Soon sadržaj */}
            <main className="relative z-10 my-auto py-4 w-full max-w-2xl flex flex-col items-center text-center">
              {/* Badge: STRANICA JE TRENUTNO U IZRADI */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[color:var(--color-accent-gold)]/10 border border-[color:var(--color-accent-gold)]/40 text-[color:var(--color-accent-gold)] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(194,167,90,0.15)]"
              >
                <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs" />
                <span>{COMING_SOON_CONFIG.badge}</span>
              </motion.div>

              {/* Glavni naslov */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-4"
              >
                Stvaramo{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-accent-gold)] via-[#ffe58f] to-[color:var(--color-accent-gold)] drop-shadow-[0_2px_15px_rgba(194,167,90,0.3)]">
                  {COMING_SOON_CONFIG.titleHighlight}
                </span>{' '}
                za vaše proslave
              </motion.h1>

              {/* Opisni tekst */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed font-light"
              >
                {COMING_SOON_CONFIG.subtitle}
              </motion.p>

              {/* Animirani Audio Equalizer / Zvučni val */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center justify-center gap-2 px-5 py-3 mb-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              >
                <FontAwesomeIcon icon={faHeadphones} className="text-[color:var(--color-accent-gold)] text-base mr-2" />
                <div className="flex items-end gap-1.5 h-8">
                  {soundWaveHeights.map((heights, idx) => (
                    <motion.span
                      key={idx}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[color:var(--color-accent-gold)] to-[#ffe382] shadow-[0_0_8px_rgba(194,167,90,0.6)]"
                      animate={{ height: heights }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.1 + (idx % 3) * 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-3">
                  Pioneer Pro Audio • DMX Light Show
                </span>
              </motion.div>

              {/* OBAVIJEST O REZERVACIJAMA & KONTAKTIRANJU */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full p-5 sm:p-6 mb-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-[color:var(--color-accent-gold)]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(194,167,90,0.08)]"
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-[color:var(--color-accent-gold)] font-bold text-sm sm:text-base">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <span>{COMING_SOON_CONFIG.noteTitle}</span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-5 leading-relaxed max-w-lg mx-auto">
                  {COMING_SOON_CONFIG.noteSubtitle}
                </p>

                {/* GLAVNI GUMBI ZA KONTAKT (POZIV & WHATSAPP) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {/* Poziv */}
                  <a
                    href={`tel:${COMING_SOON_CONFIG.phone}`}
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[color:var(--color-accent-gold)] via-[#ffdf73] to-[color:var(--color-accent-gold)] shadow-[0_0_20px_rgba(194,167,90,0.4)] hover:shadow-[0_0_30px_rgba(255,223,115,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Nazovi: {COMING_SOON_CONFIG.phoneDisplay}</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={COMING_SOON_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                    <span>WhatsApp Poruka</span>
                  </a>
                </div>

                {/* DODATNI KONTAKTI (EMAIL & INSTAGRAM) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                  <a
                    href={`mailto:${COMING_SOON_CONFIG.email}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[color:var(--color-accent-gold)]/50 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-[color:var(--color-accent-gold)]" />
                    <span>{COMING_SOON_CONFIG.email}</span>
                  </a>

                  <a
                    href={COMING_SOON_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-500/50 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-pink-400" />
                    <span>{COMING_SOON_CONFIG.instagramHandle}</span>
                  </a>
                </div>
              </motion.div>

              {/* Usluge / Tagovi */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-2 max-w-lg mb-4"
              >
                {COMING_SOON_CONFIG.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] sm:text-xs text-gray-400"
                  >
                    ✦ {service}
                  </span>
                ))}
              </motion.div>
            </main>

            {/* DONJI FOOTER: Copyright & Privremeni pregled za developera/klijenta */}
            <footer className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-gray-500">
              <div>
                © {new Date().getFullYear()} DJ Proslave. Sva prava pridržana.
              </div>

              {COMING_SOON_CONFIG.allowPreviewBypass && (
                <button
                  type="button"
                  onClick={handleDismissPreview}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[color:var(--color-accent-gold)] text-gray-400 hover:text-white transition-all duration-200 text-[11px] cursor-pointer"
                  title="Privremeno sakrij overlay za pregled stranice"
                >
                  <FontAwesomeIcon icon={faEye} className="text-xs" />
                  <span>Privremeni pregled stranice</span>
                </button>
              )}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLUTAJUĆI BADGE U PREVIEW NAČINU (omogućuje povratak na overlay u 1 klik) */}
      {isDismissed && COMING_SOON_CONFIG.allowPreviewBypass && (
        <aside
          aria-label="Kontrole pregleda stranice u izradi"
          className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a0b10]/90 border border-[color:var(--color-accent-gold)]/40 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_10px_rgba(194,167,90,0.2)] backdrop-blur-md text-xs text-gray-300"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-medium text-white">Način pregleda</span>
          <span className="text-gray-500">•</span>
          <button
            type="button"
            onClick={handleRestoreOverlay}
            className="text-[color:var(--color-accent-gold)] hover:underline font-semibold cursor-pointer"
          >
            Vrati overlay
          </button>
        </aside>
      )}
    </>
  );
}
