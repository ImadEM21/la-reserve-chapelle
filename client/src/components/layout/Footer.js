import { styled } from "@mui/system";
import { Grid, Typography, Avatar, Link } from "@mui/material";
import logo from "../../images/logo.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useHistory } from "react-router-dom";

const FooterLink = styled(Link)({
  color: "black",
  fontSize: ".8rem",
  "&:hover": { color: "#D32D26" },
  marginBottom: "0.25rem",
  fontWeight: 600,
});

const Footer = () => {
  const history = useHistory();

  return (
    <>
      <Grid
        sx={{
          padding: 0,
          // width: "100vw",
          marginTop: "1rem",
          backgroundColor: "#D6D5D5",
          color: "black",
          justifyItems: "center",
        }}
      >
        <Grid sx={{}} spacing={2} container direction="row">
          <Grid item xs={1} container></Grid>
          {/* start footer */}
          <Grid item xs={3} sx={{ paddingLeft: "1rem" }}>
            <Avatar
              variant="square"
              alt="la réserve Chapelle"
              src={logo}
              gutterBottom
              sx={{ width: "70%", height: "100%", cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: "1rem" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              color="primary"
            >
              La réserve Chapelle
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ color: "black", height: "90%" }}
            >
              <FooterLink href="/" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Accueil
              </FooterLink>
              <FooterLink href="/lives" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Livres
              </FooterLink>
              <FooterLink href="/auteurs" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Auteurs
              </FooterLink>
              <FooterLink href="/categories" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Catégories
              </FooterLink>
              <FooterLink href="/apropos" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />À propos
              </FooterLink>
              <FooterLink href="/connexion" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Se connecter
              </FooterLink>
              <FooterLink href="/inscription" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                S'inscrire
              </FooterLink>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              color="primary"
            >
              Légale
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ color: "black", height: "60%" }}
            >
              <FooterLink href="/mentions-legales" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Mentions légales
              </FooterLink>
              <FooterLink href="/politique-confidentialite" underline="none">
                <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                Politique de confidentialité
              </FooterLink>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              color="primary"
            >
              Contact
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ color: "black", height: "70%" }}
            >
              <FooterLink
                href="https://goo.gl/maps/juBjqNH2vzkSqFMB9"
                sx={{ color: "black" }}
                underline="none"
              >
                <LocationOnIcon
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    marginRight: "0.25rem",
                    lineHeight: "1.1rem",
                  }}
                />
                24 rue Etienne Rognon <br />
                69007 Lyon
              </FooterLink>
              <FooterLink
                sx={{ color: "black" }}
                href="tel:+04 78 61 20 82"
                underline="none"
              >
                <PhoneIcon
                  color="primary"
                  sx={{ fontSize: "16px", marginRight: "0.25rem" }}
                />
                04 78 61 20 82
              </FooterLink>
              <FooterLink
                href="mailto:contact@chapelle.fr"
                underline="none"
                sx={{ color: "black" }}
              >
                <MailIcon
                  color="primary"
                  sx={{ fontSize: "16px", marginRight: "0.25rem" }}
                />
                contact@chapelle.fr
              </FooterLink>
              <FooterLink
                onClick={() => history.push("/nous-situer")}
                underline="none"
                sx={{ cursor: "pointer" }}
              >
                <AccessTimeIcon
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    marginRight: "0.25rem",
                    cursor: "pointer",
                  }}
                />
                Jours & Heures ouverture
              </FooterLink>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ marginTop: "2rem" }}
          >
            <Link
              href="https://www.linkedin.com/company/maison-metropolitaine-d-insertion-pour-l-emploi/"
              underline="none"
              sx={{ color: "black", "&:hover": { color: "black" } }}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon
                sx={{ cursor: "pointer", "&:hover": { color: "#E51F25" } }}
              />
            </Link>
            <Link
              href="https://twitter.com/MMIE_LyonMetrop"
              underline="none"
              sx={{ color: "black", "&:hover": { color: "black" } }}
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon
                sx={{ cursor: "pointer", "&:hover": { color: "#E51F25" } }}
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCtbCGcf-kxbZogD2xgAK8UQ"
              underline="none"
              sx={{ color: "black", "&:hover": { color: "black" } }}
              target="_blank"
              rel="noreferrer"
            >
              <YouTubeIcon
                sx={{ cursor: "pointer", "&:hover": { color: "#E51F25" } }}
              />
            </Link>
          </Grid>
          <Grid item xs={0.5} container></Grid>
          {/* end footer */}
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={{ width: "20%" }}
          >
            Copyright &copy; La réserve Chapelle
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
