import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleRegister = async () => {
    try {
      setRole("Admin");
      const response = await axios.post(baseUrl + "/user/register", {
        username,
        password,
        role,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setSuccess("Registration successful! Redirecting...");
      setError("");

      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } catch (err) {
      setError("Registration failed. Try again.");
      setSuccess("");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

export default RegisterPage;
