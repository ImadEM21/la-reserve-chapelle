import { useState } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Share from "../../layout/Share";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LastBook = ({ book }) => {
  const history = useHistory();
  const published = `Publié le ${new Date(
    book.createdAt
  ).toLocaleDateString()} à ${new Date(book.createdAt)
    .toLocaleTimeString()
    .replace(/(.*)\D\d+/, "$1")
    .replace(":", "h")}`;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => history.push(`/livres/${book.slug}`)}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={book.author.avatar}
            alt={`${book.author.firstName} ${book.author.lastName}`}
          >
            {book.author.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={book.title}
        subheader={published}
      />
      <CardMedia component="img" image={book.image} alt={book.title} />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {book.description.substring(0, 200)}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ mt: "auto" }}>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteIcon />
        </IconButton>
        <Share
          mainTitle={book.title}
          title={`Découvrez ${book.title}`}
          url={`${document.location.origin}/libres/${book.slug}`}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Voir plus"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{book.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LastBook;
