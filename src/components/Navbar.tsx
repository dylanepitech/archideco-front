import Logo from "../assets/archideco.png";
import {
  Search,
  CircleHelp,
  MapPin,
  ShoppingBasket,
  User,
  Menu,
  LayoutGrid,
  X,
} from "lucide-react";
import Accordions from "../UI/Accordion";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  function openMenu() {
    open ? setOpen(false) : setOpen(true);
    console.log(open);
  }
  return (
    <header className="font-Gotham">
      <nav className=" hidden lg:block w-screen min-h-14 h-auto pt-2 bg-white py-4 ">
        <section className="flex flex-row items-center justify-between px-2 pr-14">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="flex flex-row items-center">
            <input
              type="text"
              placeholder="  Mixeur,lave-linge,Machine à cafée..."
              className="bg-transparent border-2 border-green-duck h-10 w-100 text-black rounded-l-md text-sm"
            />
            <button className="border-green-duck border bg-green-duck h-10 p-2 flex items-center rounded-r-md hover:shadow-sm hover:shadow-black">
              {<Search color="white" />}
            </button>
          </div>
          <p className="bg-black/20 w-0.5 h-8"></p>
          <div className="flex flex-col items-center">
            <CircleHelp color="#639d87" />
            <a
              className="font-semibold text-sm hover:underline-offset-4 hover:underline"
              href=""
            >
              Foire au questions
            </a>
          </div>
          <p className="bg-black/20 w-0.5 h-8"></p>

          <div className="flex flex-col items-center">
            <MapPin color="#639d87" />
            <a
              className="font-semibold text-sm hover:underline-offset-4 hover:underline"
              href=""
            >
              Nous localiser
            </a>
          </div>
          <p className="bg-black/20 w-0.5 h-8"></p>

          <div className="flex flex-col items-center">
            <User color="#639d87" />
            <Link
              className="font-semibold text-sm hover:underline-offset-4 hover:underline"
              to="/login"
            >
              Connectez-vous!
            </Link>
          </div>
          <p className="bg-black/20 w-0.5 h-8"></p>

          <Link to="/cart" className="flex flex-col items-center">
            <ShoppingBasket color="#639d87" />
            <div
              className="font-semibold text-sm hover:underline-offset-4 hover:underline"
              
            >
              Panier
            </div>
          </Link>
        </section>
        <section className="flex flex-row w-full items-center justify-start gap-10 px-8 pt-6">
          <LayoutGrid />
          <Link
            className="font-medium  text-md hover:underline-offset-4 hover:underline decoration-green-800"
            to="/products/pem"
          >
            Petit électroménager
          </Link>
          <p className="bg-black/10 w-0.8 h-6"></p>
          <Link
            className="font-medium  text-md hover:underline-offset-4 hover:underline decoration-green-800"
            to="/products/gem"
          >
            Gros électroménager
          </Link>
          <p className="bg-black/10 w-0.8 h-6"></p>
          <Link
            className="font-medium text-md hover:underline-offset-4 hover:underline decoration-green-800"
            to="/products/cuisine"
          >
            Cuisine
          </Link>
          <p className="bg-black/10 w-0.8 h-6"></p>
          <Link
            className="font-medium  text-md hover:underline-offset-4 hover:underline decoration-green-800"
            to="/products/salon"
          >
            Salon
          </Link>
          <p className="bg-black/10 w-0.8 h-6"></p>
          <Link
            className="font-medium  text-sm hover:underline-offset-4 hover:underline decoration-green-800"
            to="/products/dressinf"
          >
            Dressing
          </Link>
        </section>
      </nav>
      {/* ////////mobile/////////// */}
      <nav className={`block lg:hidden bg-white`}>
        <section className="relative flex items-center gap-6 pl-4">
          <img src={Logo} alt="Logo" className="relative " />
          <X
            size={28}
            onClick={openMenu}
            className={`absolute right-10 transition-opacity duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"
              }`}
          />
          <Menu
            size={28}
            onClick={openMenu}
            className={`absolute  right-10 transition-opacity duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"
              }`}
          />
        </section>
      </nav>

      {open && (
        <section
          className={` bg-white block lg:hidden h-auto w-full bg-white/20 relative transition-opacity duration-300 ease-in-out `}
        >
          <div className="flex flex-row items-center justify-center px-1 py-2 bg-white">
            <input
              type="text"
              placeholder="  Mixeur,lave-linge,Machine à cafée..."
              className="bg-transparent border-2 border-green-duck h-10 w-full max-w-110 text-black rounded-l-md text-sm"
            />
            <button className="bg-green-duck h-10 p-2 flex items-center rounded-r-md">
              {<Search color="white" />}
            </button>
          </div>
          <div className="h-auto grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-4 pt-2 py-2 bg-white">
            <div className="flex flex-col items-center">
              <CircleHelp color="#639d87" />
              <a
                className="font-semibold text-xs hover:underline-offset-4 hover:underline"
                href=""
              >
                Foire au questions
              </a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin color="#639d87" />
              <a
                className="font-semibold text-xs hover:underline-offset-4 hover:underline"
                href=""
              >
                Nous localiser
              </a>
            </div>

            <div className="flex flex-col items-center">
              <User color="#639d87" />
              <a
                className="font-semibold text-xs hover:underline-offset-4 hover:underline"
                href=""
              >
                Connectez-vous!
              </a>
            </div>

            <div className="flex flex-col items-center">
              <ShoppingBasket color="#639d87" />
              <a
                className="font-semibold text-xs hover:underline-offset-4 hover:underline"
                href=""
              >
                Panier
              </a>
            </div>
          </div>
          <Accordions />
        </section>
      )}
    </header>
  );
}
