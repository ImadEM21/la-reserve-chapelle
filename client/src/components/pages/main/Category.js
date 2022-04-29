import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

const Category = ({ category }) => {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary={capitalizeFirstLetter(category.name)} />
    </ListItem>
  );
};

export default Category;
