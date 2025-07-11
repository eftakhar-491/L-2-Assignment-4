import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Spinner from "./components/Shared/Spinner";
interface StateContextType {
  addBookModal: boolean;
  setAddBookModal: (value: boolean) => void;
}
export const StateContext = createContext<StateContextType>(undefined!);
function App() {
  const location = useLocation();
  const { isLoading } = useSelector((state: RootState) => state.loading);

  const [addBookModal, setAddBookModal] = useState<boolean>(false);

  return (
    <>
      <StateContext.Provider value={{ addBookModal, setAddBookModal }}>
        {isLoading && <Spinner />}
        <Navbar />
        {location?.pathname === "/" ? <Home /> : <Outlet />}
        <Footer />
      </StateContext.Provider>
    </>
  );
}

export default App;
