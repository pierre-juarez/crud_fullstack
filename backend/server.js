// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(bodyParser.json());

//parse request of content-type application/x-www-form-urlencod
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

/*** Para producción => */
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const APP_NAME = process.env.APP_NAME;
const PORT = process.env.APP_PORT || 8080;

//simple router
app.get("/", (req, res) => {
  res.json({ message: `Welcome to application ${APP_NAME}` });
});

require("./routes/apunte.route")(app);

//set port, listen for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
