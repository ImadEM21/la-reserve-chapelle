import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useHistory } from "react-router-dom";

// Generate Order Data
function createData(id, date, book, endLoan, status) {
  return { id, date, book, endLoan, status };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley", "22 Mar, 2019", "Terminé"),
  createData(1, "12 Fév, 2022", "Paul McCartney", "20 Fév, 2022", "Terminé"),
  createData(2, "10 Mar, 2022", "Tom Scholz", "15 Mar, 2022", "Terminé"),
  createData(3, "02 Avr, 2022", "Michael Jackson", "10 Avr, 2022", "Terminé"),
  createData(
    4,
    "25 Avr, 2022",
    "Bruce Springsteen",
    "03 Mai, 2022",
    "En cours"
  ),
];

export default function Orders() {
  const history = useHistory();
  return (
    <React.Fragment>
      <Title>Réservations récentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Livre</TableCell>
            <TableCell>Date de remise</TableCell>
            <TableCell align="right">État</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.book}</TableCell>
              <TableCell>{row.endLoan}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={() => history.push("/mes-reservations")}
        sx={{ mt: 3 }}
      >
        Voir plus de réservations
      </Link>
    </React.Fragment>
  );
}
