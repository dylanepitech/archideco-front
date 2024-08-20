import Navbar from "../components/Navbar";
import Samsung from "../assets/machine.png";
import Oven from "../assets/four.png";
import Coffe from "../assets/coffe.png";
import Kitchen from "../assets/celeste.webp";
import Bathroom from "../assets/imperial.webp";
import LivingRoom from "../assets/purete.png";
import Lounge from "../assets/casual-black.png";
import Frigo from "../assets/frigo.png";

import {
  Lightbulb,
  ShieldCheck,
  ArrowRightLeft,
  PackageCheck,
  Heart,
  CircleAlert,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-100 w-screen min-h-dvh h-auto text-black">
      <Navbar />
      <main className=" h-auto min-w-screen mt-6 px-4 flex flex-col gap-2">
        <section className="w-full h-auto rounded-md bg-red-500/70 text-center flex flex-col md:flex-row gap-3 items-center justify-center">
          <CircleAlert />
          <h3>
            Cette semaine profitez de -10% sur tout l'Électroménager avec le
            code <span className="font-semibold">Archideco10</span>
          </h3>
        </section>
        <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
          {[
            {
              title: "Machines à Laver & Sèche-linge",
              imgSrc: Samsung,
              alt: "Machines à Laver",
              badges: ["Samsung", "Electrolux", "Bosch", "Siemens", "LG"],
              bgColor: "bg-white",
              textColor: "text-white",
              borderColor: "border-black",
            },
            {
              title: "Fours et Micro-ondes",
              imgSrc: Oven,
              alt: "Fours et Micro-ondes",
              badges: ["Samsung", "Electrolux", "Bosch", "Siemens", "LG"],
              bgColor: "bg-green-duck",
              textColor: "text-white",
              borderColor: "border-white",
            },
            {
              title: "Machines à Café & Petit Électroménager",
              imgSrc: Coffe,
              alt: "Machines à Café",
              badges: ["Richard", "Nespresso", "De'Longhi", "Senseo", "Miele"],
              bgColor: "bg-green-duck",
              textColor: "text-white",
              borderColor: "border-white",
            },
            {
              title: "Réfrigérateurs & Congélateurs",
              imgSrc: Frigo,
              alt: "Réfrigérateurs & Congélateurs",
              badges: ["Sub-Zero", "Bosch", "LG", "Viking", "Wolf"],
              bgColor: "bg-white",
              textColor: "text-white",
              borderColor: "border-black",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`relative w-full max-w-2xl h-96 rounded-md overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 ${item.bgColor} ${item.borderColor} border hover:shadow-xl hover:cursor-pointer group`}
            >
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 flex flex-col items-center justify-center p-4 transition-opacity duration-300">
                <h1
                  className={`text-2xl font-semibold text-center ${item.textColor} group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]`}
                >
                  {item.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {item.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`badge badge-md ${
                        item.textColor === "text-white"
                          ? "bg-white text-black"
                          : "bg-black text-white"
                      } px-3 py-1 rounded-full`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="w-full bg-white rounded-md py-6 px-4 grid gap-8 md:gap-6 text-sm">
          <h2 className="text-black text-2xl font-semibold text-center">
            Nos services Archideco
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <ShieldCheck size={35} color="#639d87" />
              <p className="text-pretty font-semibold mt-2 md:mt-0 md:ml-4">
                Une garantie <span className="text-red-500">7 ans</span> sur
                tous nos produits
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <PackageCheck size={35} color="#639d87" />
              <p className="text-pretty font-semibold mt-2 md:mt-0 md:ml-4">
                Livraison, installation et mise en service
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <Lightbulb size={35} color="#639d87" />
              <p className="text-pretty font-semibold mt-2 md:mt-0 md:ml-4">
                Nos conseils achats, entretiens
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <ArrowRightLeft size={35} color="#639d87" />
              <p className="text-pretty font-semibold mt-2 md:mt-0 md:ml-4">
                Retour <span className="text-red-500">gratuit</span> en magasin
              </p>
            </div>
          </div>
        </section>
        <section className="w-full bg-white rounded-md py-6">
          <div className="flex flex-col items-center justify-center gap-2 mb-6 w-full">
            <div className=" flex flex-row gap-2 items-center justify-start w-full pl-4">
              <h2 className="text-2xl font-bold -translate-y-1 uppercase">
                Archideco
              </h2>
              <Zap
                size={30}
                color="#639d87"
                strokeWidth={2}
                absoluteStrokeWidth
                className="rotate-20"
              />
              <h2 className="text-2xl font-bold translate-y-1 uppercase">
                Mobalpa
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <h2 className="text-black text-2xl font-semibold text-center">
                - Des créations uniques et innoventes -
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-items-center">
            {[
              {
                title: "Salon moderne",
                imgSrc: LivingRoom,
                alt: "Intérieur rêve 1",
              },
              {
                title: "Cuisine élégante",
                imgSrc: Kitchen,
                alt: "Intérieur rêve 2",
              },
              {
                title: "Salle de bain relaxante",
                imgSrc: Bathroom,
                alt: "Intérieur rêve 3",
              },
              {
                title: "Dressing Chic",
                imgSrc: Lounge,
                alt: "Intérieur rêve 1",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative w-full h-72 rounded-md overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:cursor-pointer group"
              >
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
