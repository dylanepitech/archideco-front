import "./index.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext, AuthProvider } from "./hooks/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import ProtectedAdminRoute from "./hooks/ProtectedAdminRoute";
import ProtectedRoute from "./hooks/ProtectedRoute";
import RestrictedRoute from "./hooks/RestrictedRoute";
import NotFound from "./pages/NotFound";
import { ChakraProvider } from '@chakra-ui/react'
import ProductListPage from "./pages/ProductListPage";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";
import Faq from "./pages/Faq";
import CgvCgu from "./pages/CgvCgu";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import HistoirePage from "./pages/HistoirePage";

const AppRoutes: React.FC = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
    
function App() {
  return (
    <ChakraProvider>

      <Routes>
        
        {/* Toutes les routes non accessible quand user connecter */}
        <Route element={<RestrictedRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        
         {/* Toutes les routes non proteger accessible sans connexion */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/product/:category/:productTitle/:id" element={<Product/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" Component={Home} />
        <Route path="/FAQ" Component={Faq} />
        <Route path="/CGV-CGU" Component={CgvCgu} />
        <Route path="/privaci-politique" Component={PolitiqueConfidentialite} />
        <Route path="/about-us" Component={HistoirePage} />

       
        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage/>} /> */}

        {/* Route utilisateur connecter */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Route administrateur */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
       
      </Routes>
    </ChakraProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
