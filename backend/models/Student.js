const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  place: String,
  phone: String
});

module.exports = mongoose.model("Student", studentSchema);
