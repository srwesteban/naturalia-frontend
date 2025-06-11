import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    handleScrollTop();
    window.addEventListener("popstate", handleScrollTop);
    return () => {
      window.removeEventListener("popstate", handleScrollTop);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
