import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(json());

//parse request of content-type application/x-www-form-urlencod
app.use(urlencoded({ extended: true }));

//simple router
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application CRUD" });
});

//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
