import { useState } from "react";
import { sendTestData } from "./api/apiService";

function App() {
  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    verbal_score: "",
    non_verbal_score: "",
    math_score: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTestData(formData);
      alert("Test submitted successfully: " + JSON.stringify(response));
    } catch (error) {
      alert("Failed to submit test data.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Submit Your Aptitude Test</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          name="student_name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="verbal_score"
          placeholder="Verbal Score"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="non_verbal_score"
          placeholder="Non-Verbal Score"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="math_score"
          placeholder="Math Score"
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Test
        </button>
      </form>
    </div>
  );
}

export default App;
