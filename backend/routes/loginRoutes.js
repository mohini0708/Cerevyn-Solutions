const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

module.exports = router;
