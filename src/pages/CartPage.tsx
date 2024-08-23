import { useEffect, useState, useContext } from "react";
import Footer from "../components/Footer";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../hooks/AuthContext";
import { getAllProducts } from "../Requests/ProductsRequest";
import { getMyCart, updateCart } from "../Requests/CartRequest";
import { CreateCartBody } from "../Types/cartCrud";
import { localhost } from "../constants/Localhost";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface CartItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
  image?: any;
  images?: any;
  categoryId?: any;
  categoryTitle?: any;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const { authToken } = useContext(AuthContext);
  const [connected, setconnecter] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<any | null>(null);
  const toast = useToast();

  useEffect(() => {
    handleGetMyCart();
    const token: string | null = localStorage.getItem("authToken");

    if (token) {
      setconnecter(true);
    }
  }, [authToken]);

  useEffect(() => {
    handleAllGetProducts();
  }, [cart]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const idProduits: number[] = [];

      cartItems.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          idProduits.push(item.id);
        }
      });

      handleUpdateCart(idProduits);
    }
  }, [cartItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    if (cartItems.length <= 1) {
      handleUpdateCart([]);
      setCartItems([]);
      setCart([]);

      console.log("remove reussi");
    } else {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const numPrice = item.price.replace("€", "").replace(",", ".").trim();
    const price = parseFloat(numPrice);

    return sum + price * item.quantity;
  }, 0);

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Code promo soumis:", promoCode);
    setPromoCode("");
  };

  const handleGetMyCart = async () => {
    try {
      if (authToken) {
        const data: any | string = await getMyCart(authToken);
        if (typeof data === "string") {
          setCart(null);
          setError(data);
        } else {
          setCart(data.data);
          // console.log(cart)
        }
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du panier");
      console.error("Erreur:", err);
    }
  };

  const handleAllGetProducts = async () => {
    try {
      if (authToken) {
        const data: any | string = await getAllProducts();

        if (typeof data === "string") {
          setCartItems([]);
        } else {
          const idCountMap: { [id: number]: number } = {};
          cart?.id_products.forEach((id: any) => {
            let idStr: any = id.toString();
            idCountMap[idStr] = (idCountMap[idStr] || 0) + 1;
          });

          let inCart: any = data
            .filter((product: any) => idCountMap[product.id])
            .map((product: any) => ({
              ...product,
              quantity: idCountMap[product.id],
            }));

          setCartItems(inCart);
        }
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du panier");
      // console.error("Erreur:", err);
    }
  };

  const handleUpdateCart = async (idProduct: number | number[]) => {
    try {
      if (authToken) {
        let newProducts: any;
        if (Array.isArray(idProduct)) {
          newProducts = idProduct;
        } else {
          newProducts = cart?.id_products;
          newProducts.push(idProduct);
        }

        const updateData: CreateCartBody = {
          idProducts: newProducts,
        };

        let id = cart?.id ? cart?.id : cart?.data.id;

        const data: any | string = await updateCart(authToken, id, updateData);
        if (typeof data === "string") {
          setError(data);
          console.log("error", data);
        } else {
          setCart(data);
        }
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du panier");
    }
  };

  const removeBaseUrl = (url: string) => {
    if (localhost == "") {
      const baseUrl = "http://localhost:8000";
      return url.replace(baseUrl, "");
    } else {
      return url;
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      {connected ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Votre panier</h1>
          <br />
          {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="md:w-2/3 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center">
                      <Link
                        to={`/${item.categoryTitle}/${item.title}/${item.id}`}
                      >
                        {Object.keys(item.images).length > 0 && (
                          <img
                            src={removeBaseUrl(
                              item.images[Object.keys(item.images)[0]][0].image
                            )} // Récupérer la première image du premier tableau
                            alt={item.title}
                            className="w-24 h-24 object-cover mr-4 rounded"
                          />
                        )}
                      </Link>

                      <div className="flex-grow">
                        <Link
                          to={`/${item.categoryTitle}/${item.title}/${item.id}`}
                        >
                          <h2 className="text-xl font-semibold">
                            {item.title}
                          </h2>
                        </Link>
                        <p className="text-gray-600">{item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-700"
                        aria-label="Supprimer l'article"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="border rounded-lg p-4 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Récapitulatif
                  </h2>
                  <div className="flex justify-between mb-2">
                    <span>Sous-total :</span>
                    <span>{total} €</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Frais de livraison :</span>
                    <span>Gratuit</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total :</span>
                      <span>{total} €</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-green-emerald text-white px-6 py-2 rounded hover:bg-custom-bg">
                    Valider mon panier
                  </button>
                  <form onSubmit={handlePromoCodeSubmit} className="mt-4">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Code promo"
                        className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-light"
                      />
                      <button
                        type="submit"
                        className="bg-green-emerald text-white px-4 py-2 rounded-r-md hover:bg-custom-bg"
                      >
                        Appliquer
                      </button>
                    </div>
                  </form>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      NOUS ACCEPTONS :
                    </h3>
                    <div className="flex justify-center space-x-4">
                      <img
                        src="src/assets/picture/mastercard.png"
                        alt="Mastercard"
                        className="w-12 h-12 object-contain"
                      />
                      <img
                        src="src/assets/picture/visa.png"
                        alt="Mastercard"
                        className="w-12 h-12 object-contain"
                      />
                      <img
                        src="src/assets/picture/americanexpress.png"
                        alt="Mastercard"
                        className="w-12 h-12 object-contain"
                      />
                      <img
                        src="src/assets/picture/paypal.png"
                        alt="Mastercard"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <main className="flex flex-col container mx-auto px-4 py-8 items-center w-full justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Vous n'êtes pas connectez
          </h1>
          <Link
            to={"/login"}
            className="text-black font-semibold text-md text-center"
          >
            Profitez de tous nos services en vous connectant rapidement
            <span className="text-blue-500">ici</span>
          </Link>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
