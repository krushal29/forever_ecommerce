import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  // console.log("location", location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

export default ScrollToTop;
