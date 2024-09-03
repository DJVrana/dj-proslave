import React from 'react';
import './CookieConsent.scss';

function CookieConsent({ setCookieConsent }: any) {
  return (
    <div className='cookie-consent'>
      <div className='container'>
        <div className='cookie-consent-wrapper'>
          <p className='cookie-consent-text'>
            Koristimo kolačiće na našoj web stranici kako bismo vam
            pružili najrelevantnije iskustvo prateći analitičke podatke
            o vašim posjetama. Klikom na "Prihvaćam" pristajete na
            korištenje kolačića.
          </p>
          <div className='cookie-consent-btns-wrapper'>
            <div
              className='btn btn-danger cookie-consent-btn'
              onClick={() => setCookieConsent(false)}
            >
              Neprihvaćam
            </div>
            <div
              className='btn btn-primary cookie-consent-btn'
              onClick={() => setCookieConsent(true)}
            >
              Prihvaćam
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
