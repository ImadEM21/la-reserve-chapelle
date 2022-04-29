import { Typography, Grid, Button } from "@mui/material";

const Slide = ({ item }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        position: "relative",
        textAlign: "center",
        color: "green",
      }}
    >
      <img
        src={item}
        alt="médiathèque"
        loading="lazy"
        style={{ opacity: 0.4, objectFit: "cover" }}
      />
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Typography color="secondary" component="h1" variant="h1">
          Bienvenue à la réserve Chapelle
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() =>
            document.getElementById("content").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          En savoir plus
        </Button>
      </Grid>
    </div>
  );
};

export default Slide;
