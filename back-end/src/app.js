const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../front-end/build')))

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../front-end/build/index.html'))
  })

module.exports = app;
