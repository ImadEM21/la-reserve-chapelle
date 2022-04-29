import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({ mainTitle, url, title }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const getLinkToShare = (link) => {
    navigator.clipboard.writeText(link).then((res) => {
      navigator.clipboard
        .readText()
        .then((text) => {
          // console.log(text);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    });
  };
  return (
    <>
      {url && (
        <>
          <ShareIcon
            color="primary"
            onClick={handleClickOpen}
            sx={{ cursor: "pointer" }}
          />
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{mainTitle}</DialogTitle>
            <DialogContent dividers>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  width: "500px",
                  height: "50%",
                  marginBottom: "2rem",
                  [theme.breakpoints.down(500)]: {
                    width: "300px",
                    height: "50%",
                  },
                }}
              >
                <EmailShareButton url={url} subject={title} body="body">
                  <EmailIcon
                    sx={{ fontSize: "50px", "&:hover": { color: "#6d213c" } }}
                  />
                </EmailShareButton>
                <FacebookShareButton url={url} quote={title}>
                  <FacebookIcon
                    sx={{ fontSize: "50px", "&:hover": { color: "#6d213c" } }}
                  />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                  <TwitterIcon
                    sx={{ fontSize: "50px", "&:hover": { color: "#6d213c" } }}
                  />
                </TwitterShareButton>
                <LinkedinShareButton url={url}>
                  <LinkedInIcon
                    sx={{ fontSize: "50px", "&:hover": { color: "#6d213c" } }}
                  />
                </LinkedinShareButton>
              </Stack>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Link fullWidth href="#" underline="none">
                  {url}
                </Link>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={(e) => {
                    getLinkToShare(url);

                    e.preventDefault();
                    handleClose();
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
