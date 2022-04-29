import { useState, useContext, forwardRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
  Snackbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fr from "date-fns/locale/fr";
import { AuthContext } from "../../contexts/AuthContext";
import apis from "../../../api";
import countries from "../../utils/countries";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        La réserve Chapelle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Signup({ connexion }) {
  const history = useHistory();
  const { setResident } = useContext(AuthContext);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [errorBirthDate, setErrorBirthDate] = useState(false);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone && phone.length !== 10) {
      setErrorPhone(true);
      return;
    }
    if (birthDate && getAge(birthDate) < 18) {
      setErrorBirthDate(true);
      return;
    }
    if (password.length < 6) {
      setErrorPassword(true);
      return;
    }
    const payload = {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthDate,
      address,
      zipCode,
      city,
      country,
    };
    apis
      .createResident(payload)
      .then((res) => {
        setResident(res.data.resident);
        sessionStorage.setItem(
          "resident-obj",
          JSON.stringify(res.data.resident)
        );
        sessionStorage.setItem('token', res.data.token);
        connexion(res.data.token);
        history.push("/tableau-de-bord");
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response);
        if (error.response && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        }
        setError(true);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" textAlign="center">
            Commencez à réserver vos livres dans moins d'une minute !
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value={firstName}
                  onChange={(e) =>
                    setfirstName(e.target.value.replace(/[^-'a-zÀ-ÿ ]/gi, ""))
                  }
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value.replace(/[^-'a-zÀ-ÿ ]/gi, ""))
                  }
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="Adresse mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorPassword}
                  helperText={
                    errorPassword
                      ? "Le mot de passe doit contenir au moins 6 caractères"
                      : ""
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={phone}
                  error={errorPhone}
                  helperText={
                    errorPhone
                      ? "Le numéro de téléphone doit être composé de 10 chiffres"
                      : ""
                  }
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9]*$/gi, ""))
                  }
                  name="phone"
                  label="Numéro de téléphone"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
                  <DatePicker
                    label="Date de naissance"
                    value={birthDate}
                    onChange={(newValue) => {
                      setBirthDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={errorBirthDate}
                        helperText={
                          errorBirthDate
                            ? "Vous devez être majeur pour vous inscrire"
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  label="Adresse"
                  type="text"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  fullWidth
                  id="zipCode"
                  label="Code postal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  label="Ville"
                  name="city"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  id="country"
                  options={countries}
                  autoHighlight
                  onChange={(e, value) => setCountry(value.label)}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt={option.label}
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Pays"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Vous avez déjà un compte ? Connectez-vous.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Snackbar open={error} onClose={() => setError(false)}>
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Un problème est survenu, veuillez réessayer.
          <br />
          Message: {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
