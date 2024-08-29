import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import picture1 from "../assets/pictureColorMatérieaux/Déco cuisine belle (1).jpg";
import picture2 from "../assets/pictureColorMatérieaux/Petite salle de bain moderne (1).jpg";
import picture3 from "../assets/pictureColorMatérieaux/Salle à manger moderne avec canapé vert.jpg";
import picture4 from "../assets/pictureColorMatérieaux/Dressing bois scandinave.jpg";
import picture5 from "../assets/pictureColorMatérieaux/salle de bain zina.jpg";
import picture6 from "../assets/pictureColorMatérieaux/Cuisine Modum Amb.jpg";
import picture7 from "../assets/pictureColorMatérieaux/Salon Meubles Eden.jpg";
import picture8 from "../assets/pictureColorMatérieaux/Dressing Meubles 2023-06-15.webp";
import material1 from "../assets/pictureColorMatérieaux/Couleurs façades.webp"; // Remplacez ces chemins par vos images réelles
import material2 from "../assets/pictureColorMatérieaux/Bronze thermo structure.webp";
import material3 from "../assets/pictureColorMatérieaux/Chêne teinté gris.webp";
import material4 from "../assets/pictureColorMatérieaux/Okobo naturel synchrone.webp"; // Remplacez ces chemins par vos images réelles
import material5 from "../assets/pictureColorMatérieaux/Chêne teinté forest.webp";
import material6 from "../assets/pictureColorMatérieaux/Okobo Brun synchrone.webp";
import material7 from "../assets/pictureColorMatérieaux/Matières façade métallisée.webp"; // Remplacez ces chemins par vos images réelles
import material8 from "../assets/pictureColorMatérieaux/Meleze Grise Structure.webp";
import material9 from "../assets/pictureColorMatérieaux/Bois doré 552x552.webp";
import material10 from "../assets/pictureColorMatérieaux/Facade bois vintage.webp";
import color1 from "../assets/pictureColorMatérieaux/Sikkens V7 R73 V72 B84.webp";
import color2 from "../assets/pictureColorMatérieaux/Rouge impérial brillant.webp";
import color3 from "../assets/pictureColorMatérieaux/Laque noir brillant.webp";
import color4 from "../assets/pictureColorMatérieaux/Sikkens Q0-40-20 V2 R42 V87 B92.webp";
import color5 from "../assets/pictureColorMatérieaux/Sikkens F1 50 55 R197 V144.webp";
import color6 from "../assets/pictureColorMatérieaux/SikkensV0 47 19 R49 V76 B131.webp";
import color7 from "../assets/pictureColorMatérieaux/Agua Marina Verni Brillant.webp";
import color8 from "../assets/pictureColorMatérieaux/Indigo Brillant C100.webp";
import color9 from "../assets/pictureColorMatérieaux/Pumpkin mat c100.webp";
import color10 from "../assets/pictureColorMatérieaux/Laque Praline Brillant.webp";

export default function IndoorFurniture() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const materialSettings = {
    ...sliderSettings,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const colorSettings = {
    ...sliderSettings,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="bg-slate-100 w-full min-h-screen text-black">
      <Navbar />
      <div className="w-full h-full p-4">
        <Slider {...sliderSettings} className="h-full">
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              className="w-full h-full object-cover"
              src={picture1}
              alt="Description 1"
            />
            <div className="absolute top-4 sm:top-6 lg:top-20 right-4 sm:right-6 lg:right-20 bg-[#1E4347] bg-opacity-85 text-white p-4 sm:p-6 lg:p-8 h-auto w-[90%] sm:w-[80%] lg:w-[400px] flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
                Jusqu'à -10% sur nos meubles de cuisine
              </h2>
              <span className="mt-2 text-sm sm:text-base md:text-lg">
                du 22/08/24 au 02/09/24
              </span>
              <a
                href=""
                className="mt-4 underline bg-red-600 p-2 sm:p-4 text-white hover:bg-red-700 rounded-md no-underline"
              >
                VISITEZ NOS MAGASINS
              </a>
            </div>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              className="w-full h-full object-cover"
              src={picture2}
              alt="Description 2"
            />
            <div className="absolute top-4 sm:top-6 lg:top-20 right-4 sm:right-6 lg:right-20 bg-[#639D87] bg-opacity-85 text-white p-4 sm:p-6 lg:p-8 h-auto w-[90%] sm:w-[80%] lg:w-[400px] flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
                Jusqu'à -10% sur nos meubles de salle de bain
              </h2>
              <span className="mt-2 text-sm sm:text-base md:text-lg">
                du 22/08/24 au 02/09/24
              </span>
              <a
                href=""
                className="mt-4 underline bg-red-600 p-2 sm:p-4 text-white hover:bg-red-700 rounded-md no-underline"
              >
                VISITEZ NOS MAGASINS
              </a>
            </div>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              className="w-full h-full object-cover"
              src={picture3}
              alt="Description 3"
            />
            <div className="absolute top-4 sm:top-6 lg:top-20 right-4 sm:right-6 lg:right-20 bg-[#1E4347] bg-opacity-85 text-white p-4 sm:p-6 lg:p-8 h-auto w-[90%] sm:w-[80%] lg:w-[400px] flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
                Jusqu'à -10% sur nos meubles de salon
              </h2>
              <span className="mt-2 text-sm sm:text-base md:text-lg">
                du 22/08/24 au 02/09/24
              </span>
              <a
                href=""
                className="mt-4 underline bg-red-600 p-2 sm:p-4 text-white hover:bg-red-700 rounded-md no-underline"
              >
                VISITEZ NOS MAGASINS
              </a>
            </div>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              className="w-full h-full object-cover"
              src={picture4}
              alt="Description 4"
            />
            <div className="absolute top-4 sm:top-6 lg:top-20 right-4 sm:right-6 lg:right-20 bg-[#1E4347] bg-opacity-85 text-white p-4 sm:p-6 lg:p-8 h-auto w-[90%] sm:w-[80%] lg:w-[400px] flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
                Jusqu'à -10% sur nos dressings
              </h2>
              <span className="mt-2 text-sm sm:text-base md:text-lg">
                du 22/08/24 au 02/09/24
              </span>
              <a
                href=""
                className="mt-4 underline bg-red-600 p-2 sm:p-4 text-white hover:bg-red-700 rounded-md no-underline"
              >
                VISITEZ NOS MAGASINS
              </a>
            </div>
          </div>
        </Slider>
        <div className="w-full bg-gray-100 mt-6 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Personnalisez vos intérieurs
            </h2>
            <p className="text-lg mb-8 text-center">
              Découvrez notre gamme de meubles pour cuisine, salon, dressing, et
              salle de bain. Chaque meuble peut être entièrement personnalisé
              selon vos préférences en termes de couleurs et de matériaux.
              Choisissez parmi une variété de styles et de finitions pour créer
              des pièces uniques qui reflètent votre goût et vos besoins.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={picture6}
                  alt="Meubles de Cuisine"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-[#639D87]">
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Cuisine
                  </h3>
                  <p className="text-white mb-4">
                    Personnalisez vos meubles de cuisine avec des matériaux
                    variés comme le bois, le métal, ou le verre. Choisissez
                    parmi une large palette de couleurs pour correspondre à
                    votre style.
                  </p>
                  <a
                    href="/cuisine"
                    className="inline-block bg-white text-black p-3 rounded-md hover:bg-[#1E4347] hover:text-white"
                  >
                    Explorer
                  </a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={picture7}
                  alt="Meubles de Salon"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-[#1E4347]">
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Salon
                  </h3>
                  <p className="text-white mb-4">
                    Découvrez des options de personnalisation pour vos meubles
                    de salon, incluant des tissus, cuirs, et velours, dans une
                    variété de couleurs tendance.
                  </p>
                  <a
                    href="/salon"
                    className="inline-block bg-white text-black p-3 rounded-md hover:bg-[#639D87] hover:text-white"
                  >
                    Explorer
                  </a>
                </div>
              </div>
              <div className=" shadow-lg rounded-lg overflow-hidden bg-[#639D87]">
                <img
                  src={picture8}
                  alt="Meubles de Dressing"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-[#639D87]">
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Dressing
                  </h3>
                  <p className="text-white mb-4">
                    Personnalisez vos meubles de dressing avec des finitions en
                    bois, métal ou mélaminé. Choisissez les couleurs qui
                    s'harmonisent avec votre espace.
                  </p>
                  <a
                    href="/dressing"
                    className="inline-block bg-white text-black p-3 rounded-md hover:bg-[#1E4347] hover:text-white"
                  >
                    Explorer
                  </a>
                </div>
              </div>
              <div className="bg-[#1E4347] shadow-lg rounded-lg overflow-hidden">
                <img
                  src={picture5}
                  alt="Meubles de Salle de Bain"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-[#1E4347]">
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Salle de Bain
                  </h3>
                  <p className="text-white mb-4">
                    Offrez-vous des meubles de salle de bain personnalisés en
                    céramique, marbre, ou résine. Choisissez des couleurs et
                    finitions qui correspondent à votre style.
                  </p>
                  <a
                    href="/salle-de-bain"
                    className="inline-block bg-white text-black p-3 rounded-md hover:bg-[#639D87] hover:text-white"
                  >
                    Explorer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">
          Nos matériaux
        </h1>
        <Slider {...materialSettings} className="h-full">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material1}
              alt="Matériau 1"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material2}
              alt="Matériau 2"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material3}
              alt="Matériau 3"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material4}
              alt="Matériau 4"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material5}
              alt="Matériau 5"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material6}
              alt="Matériau 6"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material7}
              alt="Matériau 7"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material8}
              alt="Matériau 8"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material9}
              alt="Matériau 9"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={material10}
              alt="Matériau 10"
            />
          </div>
        </Slider>

        <h1 className="text-3xl font-bold text-center mt-8 mb-4">
          Nos couleurs
        </h1>
        <Slider {...colorSettings} className="h-full">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color1}
              alt="Couleur 1"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color2}
              alt="Couleur 2"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color3}
              alt="Couleur 3"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color4}
              alt="Couleur 4"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color5}
              alt="Couleur 5"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color6}
              alt="Couleur 6"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color7}
              alt="Couleur 7"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color8}
              alt="Couleur 8"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color9}
              alt="Couleur 9"
            />
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={color10}
              alt="Couleur 10"
            />
          </div>
        </Slider>
      </div>
      <Footer />
    </div>
  );
}
