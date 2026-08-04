import express from "express";
import cors from "cors";
import env from "dotenv";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./config/swagger.js";
import routerIndex from "./routers/index.js";

import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

env.config();

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routerIndex);

export { app };
