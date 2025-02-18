import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const API_URL = baseUrl + "/flight";
const token = localStorage.getItem("token");

const flightService = {
  getAllFlights: async () => {
    if (token) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check for successful response
        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Unexpected response: ${response.status}`);
          return null;
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        return null;
      }
    } else {
      console.warn("No token found, redirecting to login.");
      // Redirect to login if no token
      window.location.href = "/login";
      return null;
    }
  },

  getFlightById: async (id) => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Unexpected response: ${response.status}`);
          return null;
        }
      } catch (err) {
        console.error("Error fetching flight by ID:", err);
        return null;
      }
    } else {
      console.warn("No token found, redirecting to login.");
      window.location.href = "/login";
      return null;
    }
  },

  addFlight: async (flightData) => {
    if (token) {
      try {
        const response = await axios.post(API_URL, flightData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          return response.data;
        } else {
          console.error(`Unexpected response: ${response.status}`);
          return null;
        }
      } catch (err) {
        console.error("Error adding flight:", err);
        return null;
      }
    } else {
      console.warn("No token found, redirecting to login.");
      window.location.href = "/login";
      return null;
    }
  },

  updateFlight: async (id, flightData) => {
    if (token) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, flightData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (err) {
        console.error("Error updating flight:", err);
        return null;
      }
    } else {
      console.warn("No token found, redirecting to login.");
      window.location.href = "/login";
      return null;
    }
  },

  deleteFlight: async (id) => {
    if (token) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Unexpected response: ${response.status}`);
          return null;
        }
      } catch (err) {
        console.error("Error deleting flight:", err);
        return null;
      }
    } else {
      console.warn("No token found, redirecting to login.");
      window.location.href = "/login";
      return null;
    }
  },
};

export default flightService;
