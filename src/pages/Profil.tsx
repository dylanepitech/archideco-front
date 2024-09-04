import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { getMe, getUser, deleteUser } from "../Requests/UserCrudRequests";
import { ApiResponse } from "../Types/userCrud";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserRoundCog, ListOrdered, Download } from "lucide-react";

function Profile() {
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState<ApiResponse | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authToken) {
          const data: ApiResponse = id
            ? await getUser(authToken, Number(id))
            : await getMe(authToken);
          setProfile(data);
          setOrders(data.data.commandes || []); // Initialize orders with current profile data
        }
      } catch (err) {
        setError("Erreur lors de la récupération du profil");
        console.error("Erreur:", err);
      }
    };

    fetchProfile();
  }, [authToken, id]);

  const handleDeleteAccount = async () => {
    try {
      if (authToken && profile) {
        await deleteUser(authToken, profile.data.id);
        console.log("Account deleted");
        setShowDeletePopup(false);
        navigate("/login");
      }
    } catch (err) {
      setError("Erreur lors de la suppression du compte");
      console.error("Erreur:", err);
    }
  };

  const handleSectionClick = (section: "personalInfo" | "orders") => {
    if (section === "personalInfo") {
      setShowPersonalInfo(true);
      setShowOrders(false);
    } else if (section === "orders") {
      setShowOrders(true);
      setShowPersonalInfo(false);
      setOrders(profile?.data.commandes || []);
    }
  };

  const handleDownloadInvoice = (orderId: number) => {
    window.open(`/invoices/${orderId}`, "_blank");
  };

  if (error) {
    return <div className="text-red-500 p-4">Erreur: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500 p-4">Chargement...</div>;
  }

  const user = profile.data;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="bg-[#1E4347] text-white py-4 sm:py-8 shadow-md">
        <div className="max-w-4xl mx-auto">
          <nav className="flex flex-wrap justify-center">
            <ul className="flex flex-col sm:flex-row sm:space-x-16 space-y-4 sm:space-y-0">
              <li className="flex flex-col items-center">
                <UserRoundCog className="mb-2" />
                <div
                  className="font-bold transition-colors duration-300 border-b-2 border-transparent hover:border-white cursor-pointer"
                  onClick={() => handleSectionClick("personalInfo")}
                >
                  Mes informations personnelles
                </div>
              </li>
              <li className="flex flex-col items-center">
                <ListOrdered className="mb-2" />
                <div
                  className="font-bold transition-colors duration-300 border-b-2 border-transparent hover:border-white cursor-pointer"
                  onClick={() => handleSectionClick("orders")}
                >
                  Mes commandes
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex flex-1 justify-center items-center p-4 sm:p-8 bg-white shadow-inner">
        <div className="max-w-2xl w-full">
          {showPersonalInfo && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 sm:p-6 mb-8">
              <h2 className="text-xl font-bold mb-2">
                Mes informations personnelles
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Nom",
                    value: user.firstname,
                  },
                  {
                    label: "Prénom",
                    value: user.lastname,
                  },
                  { label: "Email", value: user.email },
                  {
                    label: "Numéro de téléphone",
                    value: user.user_complements[0]?.phone || "",
                  },
                  {
                    label: "Adresse",
                    value: user.user_complements[0]?.adresse || "",
                  },
                  {
                    label: "Code postal",
                    value: user.user_complements[0]?.zipcode || "",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border border-gray-300 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        {label}:
                      </span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-6">
                <button
                  className="bg-red-700 px-4 py-2 rounded-xl text-white hover:bg-red-800"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          )}

          {showDeletePopup && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <p className="mb-4 text-lg">
                  Voulez-vous vraiment supprimer votre compte?
                </p>
                <div className="flex flex-col sm:flex-row justify-end">
                  <button
                    className="mb-2 sm:mb-0 sm:mr-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {showOrders && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
              <h2 className="text-xl font-bold mb-4 sm:mb-6">Mes commandes</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Aucune commande trouvée.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  {orders.map((order: any) => (
                    <div
                      key={order.id}
                      className="border border-gray-300 rounded-lg mb-4 p-4 shadow-sm"
                    >
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold text-lg">
                          Numero de commande:{" "}
                          <span className="font-normal text-gray-600">
                            {order.id}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Date de commande:{" "}
                          {new Date(order.order_date).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      </div>
                      <p className="text-gray-700 mb-2">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            order.status === "Livrée"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        {order.products.map((product: any) => (
                          <div
                            key={product.title}
                            className="border-t border-gray-200 pt-2 mt-2"
                          >
                            <p className="text-gray-800">
                              {product.title} -{" "}
                              {parseFloat(product.price).toFixed(2)} €
                            </p>
                            <p className="text-gray-600">
                              Réduction: {product.reduction || 0}%
                            </p>
                          </div>
                        ))}

                        {/* Calcul du total des prix */}
                        <div className="border-t border-gray-300 pt-2 mt-2">
                          <p className="font-semibold text-gray-800">
                            Total:{" "}
                            {order.products
                              .reduce((total: number, product: any) => {
                                const price = parseFloat(product.price) || 0;
                                const reduction =
                                  parseFloat(product.reduction) || 0;
                                const priceAfterReduction =
                                  price * (1 - reduction / 100);
                                return total + priceAfterReduction;
                              }, 0)
                              .toFixed(2)}{" "}
                            €
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="bg-[#639D87] text-white px-4 py-2 rounded-lg hover:bg-[#1E4347] flex items-center"
                        >
                          <Download className="mr-2" />
                          Télécharger la facture
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
