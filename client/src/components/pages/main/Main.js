import Navbar from "../../layout/Navbar";
import Carousel from "react-material-ui-carousel";
import media1 from "../../../images/media1.png";
import media2 from "../../../images/media2.png";
import media3 from "../../../images/media3.png";
import media4 from "../../../images/media4.png";
import Slide from "./Slide";
import LastBooks from "./LastBooks";
import { Grid } from "@mui/material";
import Authors from "./Authors";
import Categories from "./Categories";
import Footer from "../../layout/Footer";

const images = [media1, media2, media3, media4];

const Main = ({ deconnexion }) => {
  return (
    <main>
      <Navbar deconnexion={deconnexion} />
      <Grid component="section" id="hero">
        <Carousel interval={3000} indicators={false}>
          {images.map((item, i) => (
            <Slide key={i} item={item} />
          ))}
        </Carousel>
      </Grid>
      <Grid
        component="section"
        id="content"
        sx={{ backgroundColor: "text.primary" }}
      >
        <LastBooks />
      </Grid>
      <Grid
        component="section"
        id="authors"
        sx={{ backgroundColor: "text.secondary" }}
      >
        <Authors />
      </Grid>
      <Grid
        component="section"
        id="categories"
        sx={{ backgroundColor: "text.primary" }}
      >
        <Categories />
      </Grid>
      <Footer />
    </main>
  );
};

export default Main;
