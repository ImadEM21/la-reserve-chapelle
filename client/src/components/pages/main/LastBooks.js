import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import apis from "../../../api";
import LastBook from "./LastBook";

const LastBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    apis
      .getBooks()
      .then((res) => setBooks(res.data.books))
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
        Découvrez les derniers livres ajoutés dans la bibliothèque
      </Typography>
      <Grid item display="flex" justifyContent="space-around">
        {books.slice(0, 3).map((book) => (
          <LastBook key={book._id} book={book} />
        ))}
      </Grid>
    </Grid>
  );
};

export default LastBooks;
