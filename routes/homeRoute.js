const express = require("express");
const router = express.Router();

// Make sure this path is correct and the controller exports a function named buildHomeView
const homeController = require("../controllers/homeController");

// Ensure buildHomeView is a function
router.get("/", (req, res) => {
  homeController.buildHomeView(req, res);
});

module.exports = router;
