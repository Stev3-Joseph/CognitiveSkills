import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Update this if using a different backend URL

// Function to send student test results to FastAPI backend
export const sendTestData = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/submit-test/`, studentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error sending test data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
