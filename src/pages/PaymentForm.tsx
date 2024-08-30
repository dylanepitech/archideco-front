import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../hooks/AuthContext";
import { getMyCart } from "../Requests/CartRequest";
import { getAllProducts } from "../Requests/ProductsRequest";
import Logo from "../assets/LogoArchideco.png";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PqAVT06SlE6eckHoKpYCjZX0Yp7teJVJVYO3yvIKMaA9VkdfDrxiungDsUWctkdKw0FVojleTLtToPUQEE8aRgd00wh6UQpAI"
);

const PaymentForm: React.FC = () => {
  const { authToken } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (authToken) {
      fetchCartItems();
    }
  }, [authToken]);

  const fetchCartItems = async () => {
    try {
      const cartData = await getMyCart(authToken);
      const productsData = await getAllProducts();

      if (cartData && cartData.data && cartData.data.id_products) {
        const cartProducts = cartData.data.id_products
          .map((id: number) =>
            productsData.find((product: any) => product.id === id)
          )
          .filter(Boolean);

        setCartItems(cartProducts);
        calculateTotal(cartProducts);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération du panier:", err);
    }
  };

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => {
      const price = parseFloat(
        item.price.replace("€", "").replace(",", ".").trim()
      );
      return acc + price;
    }, 0);
    setTotal(sum);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe n'est pas encore chargé.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
      setError("Le champ de carte de crédit est manquant.");
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name },
      });

    if (stripeError) {
      setError(`Erreur de Stripe: ${stripeError.message}`);
      return;
    }

    try {
      if (!authToken) {
        setError("Le token d'authentification est manquant.");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/users/complements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            zip_code: zipCode,
            adresse,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(
          `Erreur lors de l'enregistrement des informations de livraison: ${data.error}`
        );
        return;
      }

      const paymentResponse = await fetch(
        "http://localhost:8000/api/process-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_method_id: paymentMethod.id,
            zip_code: zipCode,
            adresse,
            phone,
            amount: Math.round(total * 100), // Convertir en centimes
          }),
        }
      );

      const paymentData = await paymentResponse.json();

      if (paymentData.error) {
        setError(`Erreur de paiement: ${paymentData.error}`);
      } else {
        setSuccess("Paiement réussi");
        setError(null);
      }
    } catch (err) {
      setError("Erreur lors du traitement des informations");
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="p-4 bg-gray-100 flex flex-col">
        <div className="max-w-md mx-auto w-full">
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-semibold">Votre panier</h2>
            <Link to="/">
              <img src={Logo} alt="Logo" height={100} width={100} />
            </Link>
          </div>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-2 flex justify-between">
              <span>{item.title}</span>
              <span>{item.price}</span>
            </div>
          ))}
          <div className="mt-4 font-bold flex justify-between">
            <span>Total : </span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div className="mt-4 font-bold flex justify-between">
            <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                Récapitulatif de votre commande
              </h2>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full mb-2 p-2 border-b border-gray-200"
                >
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-gray-500">Prix : {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          <h2 className="text-2xl font-bold">Coordonnées de livraison</h2>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choissisez un pays</option>
            <option value="FR">France</option>
            <option value="BE">Belgique</option>
            <option value="SW">Suisse</option>
            <option value="LX">Luxembourg</option>
          </select>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              placeholder="Nom"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              placeholder="Prénom"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              placeholder="Adresse"
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              placeholder="Code Postal"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              placeholder="Ville"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              placeholder="Téléphone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="helper-checkbox"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value=""
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="ms-2 text-sm">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                Sauvegarder mes coordonnées pour la prochaine fois
              </label>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Détails de la carte</h2>
          <div>
            <CardElement className="border p-4 rounded-md shadow-sm" />
          </div>
          <div>
            <input
              placeholder="Nom sur la carte"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="helper-checkbox"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value=""
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="ms-2 text-sm">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                Utiliser l'adresse d'expédition comme adresse de facturation
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 border border-gray-300 text-black px-6 py-2 rounded bg-[#639d87]"
          >
            Payer {total.toFixed(2)} €
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
