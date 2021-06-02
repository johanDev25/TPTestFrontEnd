import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import clienteAxios from "./utils/clienteAxios";
import { AppContext } from "./components/context/AppContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routes from "./routes/Routes";
import "./App.css";

function App() {
  const [games, setgames] = useState(null);
  const [token, settoken] = useState(null);
  const [isUAdmin, setisUAdmin] = useState(false);


  useEffect(() => {
    getGames();
    settoken(localStorage.getItem("token"));
  }, [token]);

  const getGames = async () => {
    const resultado = await clienteAxios.get("/games/TwichAPI");
    setgames(resultado.data);
  };

  return (
    <>
      <AppContext.Provider value={{ token, games, isUAdmin, setgames, setisUAdmin }}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </AppContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
