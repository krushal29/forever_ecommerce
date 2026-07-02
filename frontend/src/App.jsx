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





export const backendurl=import.meta.env.VITE_BACKEND_URL

const App = () => {
  return (
    <Router>
      <ScrollToTop>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/ProductDetail/:id" element={<Product />} />
        <Route path="/admin-login" element={<Admin/>}/>
        <Route path="/admin-dashboard" element={<Dashboard/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/items" element={<List/>}/>
        <Route path="/Order" element={<Orderlayout/>}/>
        <Route path="/place-order" element={<Place_order/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </ScrollToTop>
    </Router>
  );
};

export default App;
