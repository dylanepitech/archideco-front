import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { getMe, getUser, updateUser } from "../Requests/UserCrudRequests";
import { ApiResponse } from "../Types/userCrud";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserRoundCog,
  ListOrdered,
  LogOut,
  SquarePen,
  Download,
} from "lucide-react";

function Profile() {
  const { authToken, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState<ApiResponse | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authToken) {
          const data: any = id
            ? await getUser(authToken, Number(id))
            : await getMe(authToken);
          setProfile(data);
          setFormData(data.data);
        }
      } catch (err) {
        setError("Erreur lors de la récupération du profil");
        console.error("Erreur:", err);
      }
    };

    fetchProfile();
  }, [authToken, id]);

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    try {
      if (authToken) {
        await updateUser(authToken, formData);
        setProfile({ ...profile, data: formData });
        setEditingField(null);
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil");
      console.error("Erreur:", err);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setShowDeletePopup(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutForm(true);
  };

  const handleLogoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
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
    // Implémentez la logique pour télécharger ou afficher la facture
    // Par exemple, vous pouvez rediriger vers une URL de facture
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
        <div className="max-w-6xl mx-auto">
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
              <li className="flex flex-col items-center">
                <LogOut className="mb-2" />
                <a
                  href="#logout"
                  className="font-bold transition-colors duration-300 border-b-2 border-transparent hover:border-white cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Déconnexion
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex flex-1 justify-center items-center p-4 sm:p-8 bg-white shadow-inner">
        <div className="max-w-3xl w-full">
          {showPersonalInfo && (
            <>
              <h2 className="text-xl font-bold mb-4 sm:mb-6">
                Mes informations personnelles
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <tbody className="border-t-2 border-t-[#639D87]">
                    {[
                      {
                        label: "Nom",
                        field: "firstname",
                        value: user.firstname,
                      },
                      {
                        label: "Prénom",
                        field: "lastname",
                        value: user.lastname,
                      },
                      { label: "Email", field: "email", value: user.email },
                      {
                        label: "Numéro de téléphone",
                        field: "phone",
                        value: user.user_complements[0].phone,
                      },
                      {
                        label: "Adresse",
                        field: "address",
                        value: user.user_complements[0].adresse,
                      },
                      {
                        label: "Code postal",
                        field: "zip_code",
                        value: user.user_complements[0].zipcode,
                      },
                    ].map(({ label, field, value }) => (
                      <tr
                        key={field}
                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                      >
                        <td className="p-2 sm:p-4 font-semibold text-gray-700">
                          {label}:
                        </td>
                        <td className="p-2 sm:p-4 text-gray-800">
                          {editingField === field ? (
                            <input
                              type="text"
                              name={field}
                              value={formData[field]}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                            />
                          ) : (
                            value
                          )}
                        </td>
                        <td className="p-2 sm:p-4">
                          {editingField === field ? (
                            <button
                              onClick={handleSaveClick}
                              className="p-2 rounded-full hover:bg-[#639D87] hover:text-white transition duration-300 focus:outline-none"
                            >
                              Sauvegarder
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditClick(field)}
                              className="p-2 rounded-full hover:bg-[#639D87] transition duration-300 focus:outline-none"
                            >
                              <SquarePen className="text-[#639D87] hover:text-white" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center pt-8 sm:pt-12">
                <button
                  className="bg-red-700 p-2 sm:p-[10px] rounded-xl text-white hover:bg-red-800"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Supprimer mon compte
                </button>
              </div>
            </>
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
                          ID de commande:{" "}
                          <span className="font-normal text-gray-600">
                            {order.id}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Date de commande: {order.order_date}
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
                              {product.title} - {product.price}
                            </p>
                            <p className="text-gray-600">
                              Réduction: {product.reduction}%
                            </p>
                          </div>
                        ))}
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

      {showLogoutForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <form onSubmit={handleLogoutSubmit}>
              <p className="mb-4 text-lg">
                Voulez-vous vraiment vous déconnecter?
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                  onClick={() => setShowLogoutForm(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Déconnexion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Profile;
