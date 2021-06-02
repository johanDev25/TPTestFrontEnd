import React from 'react';
import { Route } from 'react-router-dom';
import LoggedLayout from "../layouts/LoggedLayout"
import Auth from "../pages/Auth/Auth"


const ProtectedRoute = ({
    isAuthenticated,
    path,
    ...rest
}) => {
  
    return (
        <Route { ...rest }
            component={ () => (
                ( isAuthenticated )
                    ? ( <LoggedLayout path={path}/> )
                    : ( <Auth /> )
            )}
        
        />
    )
}

export default ProtectedRoute;

