import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import apis from "../../../api";
import Author from "./Author";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    apis
      .getAuthors()
      .then((res) => setAuthors(res.data.authors))
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
        color="text.primary"
        variant="h2"
      >
        Retrouvez des auteurs emblématiques et découvrez-en des nouveaux ! 
      </Typography>
      <Grid item display="flex" justifyContent="space-around">
        {authors.slice(0, 3).map((author) => (
          <Author key={author._id} author={author} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Authors;
