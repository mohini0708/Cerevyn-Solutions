const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const studentRoutes = require("./routes/studentRoutes");
app.use("/", studentRoutes);   

mongoose
  .connect("mongodb://127.0.0.1:27017/hostelDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
