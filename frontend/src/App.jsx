import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homePage/Homepage";
import Collection from "./pages/collection/Collection";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Signuppage from "./pages/signup/Signuppage";
import Product from "./pages/productdetail/Product";
import Admin from "./pages/admin/adminlogin/Admin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Add from "./pages/admin/add/Add";
import List from "./pages/admin/ListItems/List";
import Orderlayout from "./pages/admin/adminorder/Orderlayout";
import ScrollToTop from "./components/ScrollTo/ScrollToTop";
import Place_order from "./pages/placeorder/Place_order";
import Orders from "./pages/orders/Orders";
import Verify from "./pages/verify/Verify";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

export const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/ProductDetail/:id" element={<Product />} />
          <Route path="/admin-login" element={<Admin />} />

          {/* User Protected Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/place-order" element={
            <ProtectedRoute>
              <Place_order />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/verify" element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          } />

          {/* Admin Protected Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute requireAdmin={true}>
              <Add />
            </ProtectedRoute>
          } />
          <Route path="/items" element={
            <ProtectedRoute requireAdmin={true}>
              <List />
            </ProtectedRoute>
          } />
          <Route path="/Order" element={
            <ProtectedRoute requireAdmin={true}>
              <Orderlayout />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
