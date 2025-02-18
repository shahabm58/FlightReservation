import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import flightService from "../../services/flightService";

function FlightsList() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedFlight, setEditedFlight] = useState({}); // مقدار پیش‌فرض تعیین شده
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await flightService.getAllFlights();
        if (data == null) {
          navigate("/login");
        } else {
          setFlights(data);
        }
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [navigate]);

  const handleEditClick = useCallback((flight) => {
    setEditedFlight(flight);
    setOpenEditDialog(true);
  }, []);

  const handleDeleteClick = useCallback((flight) => {
    setFlightToDelete(flight);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await flightService.deleteFlight(flightToDelete.id);
      setFlights(flights.filter((flight) => flight.id !== flightToDelete.id));
      setDeleteDialogOpen(false);
    } catch (error) {
      setError("Failed to delete flight.");
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    if (
      !editedFlight.airline ||
      !editedFlight.origin ||
      !editedFlight.destination ||
      !editedFlight.departureTime
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await flightService.updateFlight(editedFlight.id, editedFlight);
      setFlights(
        flights.map((flight) =>
          flight.id === editedFlight.id ? editedFlight : flight
        )
      );
      setOpenEditDialog(false);
    } catch (error) {
      setError("Failed to update flight.");
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {flights && flights.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Airline</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Available Seats</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.availableSeats}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(flight)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(flight)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
          No flights available.
        </Typography>
      )}

      {/* Edit Flight Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Flight</DialogTitle>
        <DialogContent>
          <TextField
            label="Airline"
            name="airline"
            value={editedFlight?.airline || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Origin"
            name="origin"
            value={editedFlight?.origin || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destination"
            name="destination"
            value={editedFlight?.destination || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Seats"
            name="availableSeats"
            type="number"
            value={editedFlight?.availableSeats || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Departure Time"
            name="departureTime"
            type="datetime-local"
            value={editedFlight?.departureTime || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Flight</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this flight?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default FlightsList;
