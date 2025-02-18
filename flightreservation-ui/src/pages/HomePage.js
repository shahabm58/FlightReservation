import { Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
function HomePage() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Flight Reservation System
      </Typography>
      <Navbar />
    </Container>
  );
}

export default HomePage;
