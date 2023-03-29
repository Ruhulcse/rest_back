const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const artistRoutes = require("./routes/artistRoutes");

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Backend is running successfully....");
});

app.use("/api/v1/artist", artistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode  on port ${PORT}`
  )
);
