import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import flightService from "../../services/flightService";

const RegisterFlight = () => {
  const [flight, setFlight] = useState({
    airline: "",
    origin: "",
    destination: "",
    availableSeats: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await flightService.addFlight(flight);

      if (!response) {
        navigate("/login");
        return;
      }

      setSuccessMessage("Flight registered successfully!");
      setFlight({
        airline: "",
        origin: "",
        destination: "",
        availableSeats: "",
      });
      navigate("/flights");
    } catch (err) {
      setError("Failed to register flight. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Register Flight
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Airline"
          variant="outlined"
          name="airline"
          value={flight.airline}
          onChange={handleChange}
          required
        />
        <TextField
          label="Origin"
          variant="outlined"
          name="origin"
          value={flight.origin}
          onChange={handleChange}
          required
        />
        <TextField
          label="Destination"
          variant="outlined"
          name="destination"
          value={flight.destination}
          onChange={handleChange}
          required
        />
        <TextField
          label="Available Seats"
          type="number"
          variant="outlined"
          name="availableSeats"
          value={flight.availableSeats}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Register Flight
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterFlight;
