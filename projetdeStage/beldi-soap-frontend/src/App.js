import React , { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
 import RegisterPage from './pages/RegisterPage';
 import ProfilePage from './pages/ProfilePage/ProfilePage';
import HomePage from './pages/HomePage/HomePage'; // temporairement
import FavouritePage from './pages/FavouritePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CategorieFloral from './pages/CategoryPage/CategorieFloral';
import CategorieFresh from './pages/CategoryPage/CategorieFresh';
import CategorieGourmand from './pages/CategoryPage/CategorieGourmand';
import CategorieVegetal from './pages/CategoryPage/CategorieVegetal';
import CategorieWoodlands from './pages/CategoryPage/CategorieWoodlands';
import CategorieFruity from "./pages/CategoryPage/CategorieFruity";
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/Admin/AdminAddProduct';
import AllProducts from './pages/Admin/AllProducts';
import EditProduct from './pages/Admin/EditProduct';
import CartPage from './pages/CartPage';
import LoginAdmin from './pages/Admin/LoginAdmin';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from "./pages/PaymentPage";

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/fruity" element={<CategorieFruity />} />

        <Route path="/category/floral" element={<CategorieFloral />} />
        <Route path="/category/fresh" element={<CategorieFresh />} />
        <Route path="/category/gourmand" element={<CategorieGourmand />} />
        <Route path="/category/vegetal" element={<CategorieVegetal />} />
        <Route path="/category/woodlands" element={<CategorieWoodlands />} />
        <Route path="/favourites" element={<FavouritePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Admin/add-product" element={<AddProductPage />} />
        <Route path="/Admin" element={<AllProducts />} />
        <Route path="/Admin/edit-Product/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}


export default App;
