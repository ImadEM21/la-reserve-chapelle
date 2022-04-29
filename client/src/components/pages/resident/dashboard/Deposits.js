import { useState, useEffect, useContext } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import apis from "../../../../api";
import { AuthContext } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Deposits() {
  const { resident } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const history = useHistory();

  useEffect(() => {
    apis
      .getLoans(resident._id)
      .then((res) => setLoans(res.data.loans))
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });
  }, [resident._id]);

  return (
    <>
      <Title>Réservations des 30 derniers jours</Title>
      <Typography component="p" variant="h4">
        {loans.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        au {new Date().toLocaleDateString()}
      </Typography>
      <div>
        <Link
          color="primary"
          href="#"
          onClick={() => history.push("/mes-reservations")}
        >
          Voir toutes les reservations
        </Link>
      </div>
    </>
  );
}
