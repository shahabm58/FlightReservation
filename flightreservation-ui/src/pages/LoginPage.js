import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(baseUrl + "/user/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setError("");
      window.location.href = "/home";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

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

      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{ margin: "10px" }}
        onClick={() => (window.location.href = "/register")}
      >
        Create an account
      </Button>
    </Container>
  );
}

export default LoginPage;
