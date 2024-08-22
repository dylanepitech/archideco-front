// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import picture1 from "../assets/pictureColorMatérieaux/Déco cuisine belle (1).jpg"
// import picture2 from "../assets/pictureColorMatérieaux/Petite salle de bain moderne (1).jpg";
// import picture3 from "../assets/pictureColorMatérieaux/Salle à manger moderne avec canapé vert.jpg";
// import picture4 from "../assets/pictureColorMatérieaux/Dressing bois scandinave.jpg";
// import picture5 from "../assets/pictureColorMatérieaux/salle de bain zina.jpg";
// import picture6 from "../assets/pictureColorMatérieaux/Cuisine Modum Amb.jpg";
// import picture7 from "../assets/pictureColorMatérieaux/Salon Meubles Eden.jpg";
// import picture8 from "../assets/pictureColorMatérieaux/Dressing Meubles 2023-06-15.webp";
// import material1 from "../assets/pictureColorMatérieaux/Couleurs façades.webp"; // Remplacez ces chemins par vos images réelles
// import material2 from "../assets/pictureColorMatérieaux/Bronze thermo structure.webp"
// import material3 from "../assets/pictureColorMatérieaux/Chêne teinté gris.webp";
// import material4 from "../assets/pictureColorMatérieaux/Okobo naturel synchrone.webp"; // Remplacez ces chemins par vos images réelles
// import material5 from "../assets/pictureColorMatérieaux/Chêne teinté forest.webp";
// import material6 from "../assets/pictureColorMatérieaux/Okobo Brun synchrone.webp";
// import material7 from "../assets/pictureColorMatérieaux/Matières façade métallisée.webp"; // Remplacez ces chemins par vos images réelles
// import material8 from "../assets/pictureColorMatérieaux/Meleze Grise Structure.webp";
// import material9 from "../assets/pictureColorMatérieaux/Bois doré 552x552.webp";
// import material10 from "../assets/pictureColorMatérieaux/Facade bois vintage.webp";
// import color1 from "../assets/pictureColorMatérieaux/Sikkens V7 R73 V72 B84.webp";
// import color2 from "../assets/pictureColorMatérieaux/Rouge impérial brillant.webp";
// import color3 from "../assets/pictureColorMatérieaux/Laque noir brillant.webp";
// import color4 from "../assets/pictureColorMatérieaux/Sikkens Q0-40-20 V2 R42 V87 B92.webp";
// import color5 from "../assets/pictureColorMatérieaux/Sikkens F1 50 55 R197 V144.webp";
// import color6 from "../assets/pictureColorMatérieaux/SikkensV0 47 19 R49 V76 B131.webp";
// import color7 from "../assets/pictureColorMatérieaux/Agua Marina Verni Brillant.webp";
// import color8 from "../assets/pictureColorMatérieaux/Indigo Brillant C100.webp";
// import color9 from "../assets/pictureColorMatérieaux/Pumpkin mat c100.webp";
// import color10 from "../assets/pictureColorMatérieaux/Laque Praline Brillant.webp";
// import { Link } from "react-router-dom";

// export default function IndoorFurniture() {
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//   };

//   const materialSettings = {
//     ...sliderSettings,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };

//   const colorSettings = {
//     ...sliderSettings,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="bg-slate-100 w-full min-h-screen text-black">
//       <Navbar />
//       <div className="w-full h-full p-4">
//         <Slider {...sliderSettings} className="h-full">
//           <div className="relative w-full h-[600px]">
//             <img
//               className="w-full h-full object-cover"
//               src={picture1}
//               alt="Description 1"
//             />
//             <div className="absolute top-20 right-20 bg-[#1E4347] bg-opacity-85 text-white h-[400px] w-[400px] flex flex-col items-center justify-center">
//               <h2 className="text-3xl font-bold absolute top-20 p-6 ">
//                 Jusqu'à -10% sur nos meubles de cuisine
//               </h2>
//               <span className="absolute top-[200px] left-8 text-l">
//                 du 22/08/24 au 02/09/24
//               </span>
//               <Link
//                 to="/map"
//                 className="absolute bottom-[100px] left-8 underline bg-red-600 p-4 text-white  hover:bg-red-700 rounded-md no-underline"
//               >
//                 VISITEZ NOS MAGASIN
//               </Link>
//             </div>
//           </div>
//           <div className="relative w-full h-[600px]">
//             <img
//               className="w-full h-full object-cover"
//               src={picture2}
//               alt="Description 2"
//             />
//             <div className="absolute top-20 right-20 bg-[#639D87] bg-opacity-85 text-white h-[400px] w-[400px] flex flex-col items-center justify-center">
//               <h2 className="text-3xl font-bold absolute top-20 p-6 ">
//                 Jusqu'à -10% sur nos meubles de salle de bain
//               </h2>
//               <span className="absolute top-[200px] left-8 text-l">
//                 du 22/08/24 au 02/09/24
//               </span>
//               <a
//                 href=""
//                 className="absolute bottom-[100px] left-8 underline bg-red-600 p-4 text-white  hover:bg-red-700 rounded-md no-underline"
//               >
//                 VISITEZ NOS MAGASIN
//               </a>
//             </div>
//           </div>

//           <div className="relative w-full h-[600px]">
//             <img
//               className="w-full h-full object-cover"
//               src={picture3}
//               alt="Description 3"
//             />
//             <div className="absolute top-20 right-20 bg-[#1E4347] bg-opacity-85 text-white h-[400px] w-[400px] flex flex-col items-center justify-center">
//               <h2 className="text-3xl font-bold absolute top-20 p-6 ">
//                 Jusqu'à -10% sur nos meubles de salon
//               </h2>
//               <span className="absolute top-[200px] left-8 text-l">
//                 du 22/08/24 au 02/09/24
//               </span>
//               <a
//                 href=""
//                 className="absolute bottom-[100px] left-8 underline bg-red-600 p-4 text-white  hover:bg-red-700 rounded-md no-underline"
//               >
//                 VISITEZ NOS MAGASIN
//               </a>
//             </div>
//           </div>

//           <div className="relative w-full h-[600px]">
//             <img
//               className="w-full h-full object-cover"
//               src={picture4}
//               alt="Description 4"
//             />
//             <div className="absolute top-20 right-20 bg-[#639D87] bg-opacity-85 text-white h-[400px] w-[400px] flex flex-col items-center justify-center">
//               <h2 className="text-3xl font-bold absolute top-20 p-6 ">
//                 Jusqu'à -10% sur nos meubles de dressing
//               </h2>
//               <span className="absolute top-[200px] left-8 text-l">
//                 du 22/08/24 au 02/09/24
//               </span>
//               <a
//                 href=""
//                 className="absolute bottom-[100px] left-8 underline bg-red-600 p-4 text-white  hover:bg-red-700 rounded-md no-underline"
//               >
//                 VISITEZ NOS MAGASIN
//               </a>
//             </div>
//           </div>
//         </Slider>
//       </div>

//       <div className="w-full bg-gray-100 mt-6 py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8 text-center">
//             Personnalisez Vos Meubles
//           </h2>
//           <p className="text-lg mb-8 text-center">
//             Découvrez notre gamme de meubles pour cuisine, salon, dressing, et
//             salle de bain. Chaque meuble peut être entièrement personnalisé
//             selon vos préférences en termes de couleurs et de matériaux.
//             Choisissez parmi une variété de styles et de finitions pour créer
//             des pièces uniques qui reflètent votre goût et vos besoins.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={picture6}
//                 alt="Meubles de Cuisine"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6 bg-[#639D87]">
//                 <h3 className="text-2xl text-white font-semibold mb-4">
//                   Cuisine
//                 </h3>
//                 <p className="text-white mb-4">
//                   Personnalisez vos meubles de cuisine avec des matériaux variés
//                   comme le bois, le métal, ou le verre. Choisissez parmi une
//                   large palette de couleurs pour correspondre à votre style.
//                 </p>
//                 <a
//                   href="/cuisine"
//                   className="inline-block bg-[#1E4347] text-white p-3 rounded-md hover:bg-white hover:text-[#1E4347]"
//                 >
//                   Explorer
//                 </a>
//               </div>
//             </div>
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={picture7}
//                 alt="Meubles de Salon"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6 bg-[#1E4347]">
//                 <h3 className="text-2xl text-white font-semibold mb-4">
//                   Salon
//                 </h3>
//                 <p className="text-white mb-4">
//                   Découvrez des options de personnalisation pour vos meubles de
//                   salon, incluant des tissus, cuirs, et velours, dans une
//                   variété de couleurs tendance.
//                 </p>
//                 <a
//                   href="/salon"
//                   className="inline-block bg-[#639D87] text-white p-3 rounded-md hover:bg-white hover:text-[#639D87]"
//                 >
//                   Explorer
//                 </a>
//               </div>
//             </div>
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={picture8}
//                 alt="Meubles de Dressing"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6 bg-[#639D87]">
//                 <h3 className="text-2xl text-white font-semibold mb-4">
//                   Dressing
//                 </h3>
//                 <p className="text-white mb-4">
//                   Personnalisez vos meubles de dressing avec des finitions en
//                   bois, métal ou mélaminé. Choisissez les couleurs qui
//                   s'harmonisent avec votre espace.
//                 </p>
//                 <a
//                   href="/dressing"
//                   className="inline-block bg-[#1E4347] text-white p-3 rounded-md hover:bg-white hover:text-[#1E4347]"
//                 >
//                   Explorer
//                 </a>
//               </div>
//             </div>
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={picture5}
//                 alt="Meubles de Salle de Bain"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6 bg-[#1E4347]">
//                 <h3 className="text-2xl text-white font-semibold mb-4">
//                   Salle de Bain
//                 </h3>
//                 <p className="text-white mb-4">
//                   Offrez-vous des meubles de salle de bain personnalisés en
//                   céramique, marbre, ou résine. Choisissez des couleurs et
//                   finitions qui correspondent à votre style.
//                 </p>
//                 <a
//                   href="/salle-de-bain"
//                   className="inline-block bg-[#639D87] text-white p-3 rounded-md hover:bg-white hover:text-[#639D87]"
//                 >
//                   Explorer
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Carrousel des matériaux */}
//       <div className="w-full bg-gray-100 py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8 text-center">
//             Découvrez Nos Matériaux
//           </h2>
//           <Slider {...materialSettings} className="w-full">
//             <div className="bg-white p-6">
//               <img
//                 src={material1}
//                 alt="Matériau 1"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Noyer rainuré</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material2}
//                 alt="Matériau 2"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Noyer</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material3}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Chêne</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material4}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Noyer du Quercy structuré
//               </h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material5}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Chêne synchrone</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material6}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Chêne Héritage</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material7}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Chêne Alba synchrone
//               </h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material8}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Mélèze grisé structuré
//               </h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material9}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Fénix oro cortez</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={material10}
//                 alt="Matériau 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Caspio Argento</h3>
//             </div>
//           </Slider>
//         </div>
//       </div>

//       {/* Carrousel des couleurs */}
//       <div className="w-full bg-gray-100 py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8 text-center">
//             Explorez Nos Couleurs
//           </h2>
//           <Slider {...colorSettings} className="w-full">
//             <div className="bg-white p-6 ">
//               <img
//                 src={color1}
//                 alt="Couleur 1"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Laqué bleu de minuit mat
//               </h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color2}
//                 alt="Couleur 2"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Laqué rouge impérial brillant
//               </h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color3}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Laqué noir brillant</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color4}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Vert sapin</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color5}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Sikkens E25257</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color6}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Sikkens V04719</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color7}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">
//                 Agua marina verni mat
//               </h3>
//             </div>
//             <div className="bg-white p-6 ">
//               <img
//                 src={color8}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Sikkens T03020</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color9}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Sikkens E06050</h3>
//             </div>
//             <div className="bg-white p-6">
//               <img
//                 src={color10}
//                 alt="Couleur 3"
//                 className="w-full h-48 object-cover mb-4 rounded-lg"
//               />
//               <h3 className="text-l font-semibold mb-2">Gris étain brillant</h3>
//             </div>
//           </Slider>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
