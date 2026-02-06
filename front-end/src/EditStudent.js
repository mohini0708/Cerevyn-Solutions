import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPlace(res.data.place);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        console.error("EDIT FETCH ERROR", err);
        alert("Edit API not found (404)");
      });
  }, [id]);

  const updateStudent = async () => {
    if (!name || !place || !phone) {
      alert("Fill all fields");
      return;
    }

    await axios.put(`http://localhost:5000/students/${id}`, {
      name,
      place,
      phone
    });

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>✏️ Edit Student</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />

      <input
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Place"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />

      <button onClick={updateStudent}>Update</button>
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}
