import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Share from "../../layout/Share";

export default function Author({ author }) {
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        alt={`${author.firstName} ${author.lastName}`}
        height="300"
        image={author.avatar}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {author.firstName} {author.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author.resume}
        </Typography>
      </CardContent>
      <CardActions>
        <Share
          mainTitle={`${author.firstName} ${author.lastName}`}
          title={`Découvre l'auteur ${author.firstName} ${author.lastName}`}
          url={`${document.location.origin}/libres/${author.slug}`}
        />
        <Button
          size="small"
          onClick={() => history.push(`/auteurs/${author.slug}`)}
        >
          En savoir plus
        </Button>
      </CardActions>
    </Card>
  );
}
