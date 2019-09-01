import express from "express";
import bodyParser from "body-parser";


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express middleware and other middlewares or connections can be initialized here

export default app;
