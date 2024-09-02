import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Merci pour votre achat !</h1>
      <p className="text-lg">Votre commande a été reçue avec succès.</p>
    </div>
  );
};

export default ThankYouPage;
