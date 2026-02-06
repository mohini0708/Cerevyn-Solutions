import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !place || !phone) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/students", {
      name,
      place,
      phone
    });

    setName("");
    setPlace("");
    setPhone("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents();
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h2>🏨 Hostel Student Records</h2>
        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Add Student Form */}
      <div className="form">
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addStudent}>➕ Add Student</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Name</th>
            <th>Place</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={s._id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.place}</td>
              <td>{s.phone}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit/${s._id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(s._id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
