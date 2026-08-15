import express from "express";
import cors from "cors";
import env from "dotenv";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./config/swagger.js";
import routerIndex from "./routers/index.js";
import cookieParser from "cookie-parser";

import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

env.config();

const app = express();

// app.use(
//   cors({
//     origin: "*",
//   }),
// );
app.use(
  cors({
    origin: "https://evanoo.in/", // 👈 Put your exact React URL here (DO NOT USE '*')
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// // Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routerIndex);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
