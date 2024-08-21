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


const AppRoutes: React.FC = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>

      <Routes>
        {/* Toutes les routes non connecter  */}
        <Route element={<RestrictedRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/product/:category/:productTitle/:id" element={<Product/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/*" element={<NotFound />} />

       
        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage/>} /> */}


        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />


        </Route>

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
