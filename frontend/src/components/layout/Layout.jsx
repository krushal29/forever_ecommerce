  
  import { useLocation } from "react-router-dom";
  import Navbar from '../navbar/Navbar'
  import Footer from '../footer/Footer'
  const Layout = ({ children,count10 }) => {
    const location = useLocation();
    const isHomepage = location.pathname === "/";
    const isloginPage=location.pathname==='/login';
    const issignuppage=location.pathname==='/signup';
    return (
      <div>
        <Navbar border1={(isHomepage||isloginPage||issignuppage) ? { border: "none" } : {}  } />
        <div>{children}</div>
        <Footer />
      </div>
    );
  };

  export default Layout;
