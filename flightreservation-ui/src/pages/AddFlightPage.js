import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import AddNewflight from "../features/flights/AddNewFlight";

function AddFlightPage() {
  return (
    <Container>
      <Typography variant="h4">
        Add new flight
        <Navbar />
        <AddNewflight />
      </Typography>
    </Container>
  );
}

export default AddFlightPage;
