import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link
} from "react-router";
import type { Route } from "./+types/root";

import Navbar from './general/navbar/Navbar';
import Footer from './general/footer/Footer';
import FloatingContactButton from './general/floating-contact/FloatingContactButton';
import AmbientBackground from './general/ambient-background/AmbientBackground';

import stylesheet from "../styles.css?url";
import navbarStylesheet from "./general/navbar/Navbar.scss?url";
import footerStylesheet from "./general/footer/Footer.scss?url";

// FontAwesome SSR/Routing fix
import { config } from '@fortawesome/fontawesome-svg-core';
import fontawesomeStylesheet from '@fortawesome/fontawesome-svg-core/styles.css?url';
config.autoAddCss = false;

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: navbarStylesheet },
  { rel: "stylesheet", href: footerStylesheet },
  { rel: "stylesheet", href: fontawesomeStylesheet },
  { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "DJ Proslave" },
    { name: "description", content: "Pronađite DJ-a za sve vaše događaje! S pravom glazbom i vrhunskom opremom, stvaramo nezaboravne trenutke za vas i vaše goste." },
    { name: "keywords", content: "dj proslave, dj za proslave, djproslave, dj za evente, dj za vjenčanja" },
    { property: "og:title", content: "DJ Proslave" },
    { property: "og:description", content: "Pronađite DJ-a za sve vaše događaje! S pravom glazbom i vrhunskom opremom, stvaramo nezaboravne trenutke za vas i vaše goste." },
    { property: "og:image", content: "https://djproslave.com/logo.png" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" data-bs-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="DJ Proslave" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="overflow-x-hidden w-full relative">
      <AmbientBackground />
      <div className='min-h-screen grid grid-rows-[auto_1fr_auto] relative z-10'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      <FloatingContactButton />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let title = "Ups! Nešto je pošlo po zlu.";
  let message = "Dogodila se neočekivana greška. Molimo pokušajte ponovno kasnije.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (error.status === 404) {
      title = "404 - Stranica nije pronađena";
      message = "Stranica koju tražite ne postoji, premještena je ili je obrisana.";
    } else {
      title = `${error.status} - Dogodila se greška`;
      message = error.statusText || message;
    }
  }

  return (
    <div className="overflow-x-hidden w-full relative bg-[#050508]">
      <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
        <Navbar />
        <main className="flex flex-col items-center justify-center text-center px-4 py-32 relative overflow-hidden bg-[#050508]">
          {/* Dekorativni sjaj */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[color:var(--color-accent-gold)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none'></div>
          
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-accent-gold)] to-[#ffdf73] mb-6 drop-shadow-2xl relative z-10 tracking-tighter">
            {status}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6 relative z-10">
            {title}
          </h2>
          <p className="text-gray-400 font-light text-lg md:text-xl max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
            {message}
          </p>
          <div className="relative z-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[color:var(--color-accent-gold)] text-white hover:bg-[color:var(--color-accent-gold)] hover:text-black transition-colors duration-300 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              Povratak na Početnu
            </Link>
          </div>
        </main>
        <Footer />
      </div>
      <FloatingContactButton />
    </div>
  );
}
