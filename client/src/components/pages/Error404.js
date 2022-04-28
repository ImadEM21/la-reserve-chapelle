import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Error404 = ({ deconnexion }) => {
  const style = {
    color: "#FF0000",
    textDecoration: "none",
  };
  return (
    <div>
      <Container sx={{ padding: "0" }}>
        <Box
          sx={{
            width: "400px",
            margin: "auto",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: 75,
              marginTop: "6rem",
            }}
          >
            Erreur 404
          </Typography>
          <Typography variant="body1">
            Désolé, cette page n'est pas disponible
          </Typography>
          <TextField
            sx={{
              width: "100%",
              margin: "20px auto",
            }}
            id="name"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            required
            type="text"
            size="small"
            variant="outlined"
            placeholder="Search"
          />
          <Link to="/" style={style}>
            Retour à la page d'accueil
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default Error404;
