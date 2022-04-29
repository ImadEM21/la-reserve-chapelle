import { useState, useEffect } from "react";
import { Grid, Typography, List } from "@mui/material";
import apis from "../../../api";
import Category from "./Category";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apis
      .getCategories()
      .then((res) => setCategories(res.data.categories))
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });
  }, []);

  return (
    <Grid container direction="column" gap="2rem" paddingBottom="1rem">
      <Typography
        textAlign="center"
        component="h2"
        color="text.secondary"
        variant="h2"
      >
        Retrouvez toutes les catégories qui vous plaisent !
      </Typography>
      <Grid item display="flex" justifyContent="space-around">
        <List>
          {categories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Categories;
