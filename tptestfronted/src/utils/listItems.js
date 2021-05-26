import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StarIcon from '@material-ui/icons/Star';
import {Link} from "react-router-dom"

export const mainListItems = (
  <div>
    <ListSubheader inset>Twich VIP</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to='/'>
      <ListItemText primary="Home VIP" />
      </Link>
    </ListItem>
    <ListItem button>
     
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <Link to='/Favorites'>
      <ListItemText primary="Favorites" />
      </Link>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Twich Common</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to='/'>
      <ListItemText primary="Home" />
      </ Link>
    </ListItem>
  </div>
);