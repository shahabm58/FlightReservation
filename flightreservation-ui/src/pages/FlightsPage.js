import FlightsList from "../features/flights/FlightsList";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function FlightsPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Flights
      </Typography>
      <Navbar />
      <FlightsList />
    </Container>
  );
}

export default FlightsPage;
