import firebase from "./utils/Firebase";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { isAdmin } from "./utils/isAdmin";
import { useEffect } from "react";
import clienteAxios from "./utils/clienteAxios";
import Auth from "./pages/Auth/Auth";
import LoggedLayout from "./layouts/LoggedLayout";
import { AppContext } from "./components/context/AppContext";
import { Provider } from 'react-redux';
import { store } from './store/store';
import "./App.css";
import "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [localUser, setlocalUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [userAdmin, setuserAdmin] = useState(false);
  const [games, setgames] = useState(null);

  useEffect(() => {
    getGames();
  }, [user]);

  const getGames = async () => {
    const resultado = await clienteAxios.get("/games/TwichAPI");
    setgames(resultado.data);
  };

  firebase.auth().onAuthStateChanged((currentUser) => {
    isAdmin(currentUser?.uid).then((response) => {
      setuserAdmin(response);
      if (!response && !currentUser?.emailVerified) {
        firebase.auth().signOut();
        setUser(null);
      } else {
        setUser(currentUser);
      }
    });
    setloading(false);
  });

  if (loading) {
    return null;
  }

  return (
    <>
     <Provider store={ store }>
      <AppContext.Provider value={{ games, localUser, setgames, setlocalUser }}>
        {!user && !localUser ? (
          <Auth />
        ) : (
          <LoggedLayout
            user={user}
            userAdmin={userAdmin}
          />
        )}
      </AppContext.Provider>
      </Provider>
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
