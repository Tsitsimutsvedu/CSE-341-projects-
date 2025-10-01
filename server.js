require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const bookRoute = require("./routes/booksRoute");
const authorRoute = require("./routes/authorsRoute");
const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const authenticated = require("./middleware");

require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/books", bookRoute);
app.use("/authors", authorRoute);
app.use("/api-docs", authenticated.isAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// MongoDB connection and server start
(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
})();
