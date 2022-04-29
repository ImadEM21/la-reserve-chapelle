import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import { useLocation, useHistory } from "react-router-dom";

const ListSideBar = ({ deconnexion }) => {
  const location = useLocation();
  const history = useHistory();
  return (
    <List component="nav">
      <ListItemButton
        selected={location.pathname === "/tableau-de-bord"}
        onClick={() => history.push("/tableau-de-bord")}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" />
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === "/mes-reservations"}
        onClick={() => history.push("/mes-reservations")}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Mes réservations" />
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === "/livres-favoris"}
        onClick={() => history.push("/livres-favoris")}
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Mes livres favoris" />
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === "/auteurs-favoris"}
        onClick={() => history.push("/auteurs-favoris")}
      >
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Mes auteurs favoris" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Mes informations
      </ListSubheader>
      <ListItemButton
        selected={location.pathname === "/mon-profil"}
        onClick={() => history.push("/mon-profil")}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Mon profil" />
      </ListItemButton>
      <ListItemButton onClick={() => deconnexion()}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Deconnexion" />
      </ListItemButton>
    </List>
  );
};

export default ListSideBar;
