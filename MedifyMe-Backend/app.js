if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const morgan = require("morgan");
const dbUrl = process.env.DB_URL;
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const gptRoutes = require("./routes/gpt");
const paymentRoutes = require("./routes/payment");
const meetRoutes = require("./routes/meet");

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo Is Running");
  })
  .catch((err) => {
    console.log("mongo error" + err);
  });

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  cors({
    origin: 'https://medifymeiitbhu.me',
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});

app.get("/", async (req, res) => {
  res.send("home");
});

app.use("/gpt", gptRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/payments", paymentRoutes);
app.use("/meet", meetRoutes);

app.all("*", (req, res, next) => {
  res.status(404).send("Page Not Found Yo");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server Started");
});
