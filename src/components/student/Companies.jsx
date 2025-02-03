import React from 'react';

// Correctly import your assets
import microsoftLogo from '../../assets/microsoft_logo.svg'; 
import walmartLogo from '../../assets/walmart_logo.svg';
import accentureLogo from '../../assets/accenture_logo.svg';
import adobeLogo from '../../assets/adobe_logo.svg';
import paypalLogo from '../../assets/paypal_logo.svg';

const Companies = () => {
  return (
    <div className="pt-16">
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        {/* Make sure the assets are being used correctly */}
        <img src={microsoftLogo} alt="Microsoft" className="w-20 md:w-28" />
        <img src={walmartLogo} alt="Walmart" className="w-20 md:w-28" />
        <img src={accentureLogo} alt="Accenture" className="w-20 md:w-28" />
        <img src={adobeLogo} alt="Adobe" className="w-20 md:w-28" />
        <img src={paypalLogo} alt="PayPal" className="w-20 md:w-28" />
      </div>
    </div>
  );
}

export default Companies;
