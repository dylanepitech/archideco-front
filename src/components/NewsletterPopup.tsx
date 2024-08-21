import React, { useState } from "react";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="bg-green-emerald text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 btn btn-solid-success"
      >
        S'abonner
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-green-emerald mb-4">
              Suivez la tendance !
            </h2>
            <p className="text-base text-gray-700 mb-6">
              Écoutez vos envies et abonnez-vous à notre newsletter pour ne rien
              manquer des dernières tendances.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="border border-gray-300 bg-white rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-emerald"
              />
              <button
                type="submit"
                className="bg-green-emerald text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 btn btn-solid-success"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;
