import React from "react";
import { Switch, Route } from "react-router-dom";

import UserVIP from "../pages/UserVIP";
import User from "../pages/User";
import Favorites from "../pages/Favorites"

const Routes = (props) => {
  const { user, userAdmin } = props;
  return (
      <Switch>
        <Route path="/" exact>
          {userAdmin ? <UserVIP user={user} userAdmin={userAdmin} /> : <User user={user} userAdmin={userAdmin}/>}
        </Route>
        <Route path="/Favorites" exact>
          <Favorites user={user}/>
        </Route>
      </Switch>
  );
};

export default Routes;
