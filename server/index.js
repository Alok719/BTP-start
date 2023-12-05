// config
import "./config/config.js";

// imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Router from "./routes.js";
import http from "http";

// initialize express
const app = express();
const server = http.createServer(app);

// set up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// set up cors
app.use(cors());

// set up static files
app.use(express.static("uploads"));

// set up routes
app.use("/", Router);

// listen
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
