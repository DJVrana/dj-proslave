/**
 * =========================================================================
 * ⚙️ POSTAVKA ZA "COMING SOON / STRANICA U IZRADI" OVERLAY
 * =========================================================================
 * 
 * 🟢 KAKO ISKLJUČITI OVERLAY (kada želite prikazati web stranicu):
 *    Promijenite donju varijablu iz `true` u `false`:
 * 
 *    export const ENABLE_COMING_SOON = false;
 * 
 * 🔴 KAKO PONOVO UKLJUČITI OVERLAY:
 *    Vratite na:
 * 
 *    export const ENABLE_COMING_SOON = true;
 * 
 * =========================================================================
 */
export const ENABLE_COMING_SOON = true;

/**
 * Konfiguracija tekstova i kontakt podataka koji se prikazuju na overlayu.
 */
export const COMING_SOON_CONFIG = {
  badge: "STRANICA JE TRENUTNO U IZRADI",
  title: "Stvaramo novo iskustvo za vaše proslave",
  titleHighlight: "novo iskustvo",
  subtitle:
    "Radimo na novom dizajnu, galerijama i ponudi. Rezervacije termina za vjenčanja, privatne i korporativne proslave su otvorene!",
  noteTitle: "Trebate DJ-a za svoj događaj?",
  noteSubtitle:
    "Bez brige! Javite nam se direktno putem poziva ili WhatsAppa kako biste provjerili slobodne datume i zatražili ponudu.",
  
  // Kontakti DJ Vrane
  phone: "+3850989582676",
  phoneDisplay: "098 958 2676",
  whatsappUrl: "https://wa.me/385989582676",
  email: "proslave.dj@gmail.com",
  instagramUrl: "https://www.instagram.com/dj.proslave",
  instagramHandle: "@dj.proslave",

  // Usluge
  services: [
    "Vjenčanja",
    "Rođendani & Privatne zabave",
    "Poslovni & Korporativni eventi",
    "Vrhunsko ozvučenje & Ambijentalna rasvjeta"
  ],

  // Omogućuje gumb za privremeni pregled stranice (odlično za vas pri radu/testiranju)
  allowPreviewBypass: true,
};
