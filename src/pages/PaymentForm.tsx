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

const stripePromise = loadStripe(
  "pk_test_51PqAVT06SlE6eckHoKpYCjZX0Yp7teJVJVYO3yvIKMaA9VkdfDrxiungDsUWctkdKw0FVojleTLtToPUQEE8aRgd00wh6UQpAI"
);

const PaymentForm: React.FC = () => {
  const { authToken } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
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
    <div className="flex">
      <div className="w-1/3 p-4">
        <h2 className="text-2xl font-semibold mb-4">Votre panier</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="mb-2">
            <span>{item.title}</span>
            <span className="float-right">{item.price}</span>
          </div>
        ))}
        <div className="mt-4 font-bold">
          <span>Total:</span>
          <span className="float-right">{total.toFixed(2)} €</span>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Paiement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Code Postal
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Détails de la carte
            </label>
            <CardElement className="border p-4 rounded-md shadow-sm" />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-light border border-gray-300 text-black px-6 py-2 rounded hover:bg-custom-bg"
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
