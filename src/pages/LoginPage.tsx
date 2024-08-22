import { ChangeEvent, useContext, useState } from "react";
import Footer from "../components/Footer";
import { useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import famille from "../assets/picture/famille.jpg";
import { AuthContext } from "../hooks/AuthContext";
import { login } from "../Requests/AuthRequest";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erreur, setErreur] = useState<boolean>(false);
  const [messageErreur, setMessageErreur] = useState<string>("");
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessageErreur("");
    setErreur(false);
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        setAuthToken(response.token);
        navigate("/");

        toast({
          title: "Connexion réussie",
          description: "",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Email ou mot de passe invalide",
          description: "",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Email ou mot de passe invalide",
        description: "",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center">
      <Navbar />
      <main className="flex justify-center items-center bg-gradient-to-b from-green-duck to-green-emerald">
        {erreur && (
          <p className="text-center text-red-500/50 text-sm">{messageErreur}</p>
        )}
        <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-10 rounded-lg max-md:p-5 relative">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white bg-[#639D87] rounded-t-lg absolute left-0 top-0 w-full py-2">
              Connexion
            </h2>
          </div>
          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black max-md:px-2"
              >
                Adresse Mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="block w-full py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 border-b-2 border-[#639D87] outline-none"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black max-md:px-2"
                >
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#639D87] hover:text-[#1E4347] max-md:pr-2"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="block w-full py-1.5 text-black shadow-sm sm:text-sm sm:leading-6 border-b-2 border-[#1E4347] outline-none"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center border-2 rounded-md border-black bg-[#639D87] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1E4347] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#639D87]"
              >
                Se connecter
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-black">
            Pas encore de compte ?
            <a
              href="/register"
              className="font-semibold leading-6 text-[#1E4347]"
            >
              {" "}
              Créez-en un !
            </a>
          </p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg max-lg:hidden border-2">
          <img
            src={famille}
            alt="famille"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
