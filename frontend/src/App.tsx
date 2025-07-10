import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {location?.pathname === "/" ? <Home /> : <Outlet />}
      <Footer />
    </>
  );
}

export default App;
