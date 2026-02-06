const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/students", async (req, res) => {
  res.json(await Student.find());
});

router.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
});

router.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.put("/students/:id", async (req, res) => {
  res.json(
    await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

router.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
