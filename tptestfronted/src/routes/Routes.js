import React from "react";
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { AppContext } from "../components/context/AppContext";
import { startChecking } from '../actions/auth';
import ProtectedRoute from './ProtectedRoute';


const Routes = () => {
  const dispatch = useDispatch();
  const { setisUAdmin } = useContext(AppContext);
  const { checking, uid, isAdmin } = useSelector( state => state.auth);

  useEffect(() => {
    localStorage.setItem("userAdmin", isAdmin)
  }, [checking])

  useEffect(() => {
      dispatch( startChecking() );
      setisUAdmin(localStorage.getItem('userAdmin'))
  }, [dispatch])


  if ( checking ) {
      return (<h5>Waiting...</h5>);
  }

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/" exact isAuthenticated={ !!uid }/>
        <ProtectedRoute path="/Favorites" exact isAuthenticated={ !!uid }/>
      </Switch>
      </Router>
  );
};

export default Routes;
