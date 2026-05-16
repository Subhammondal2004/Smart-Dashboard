import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth-route.js";
import leadRoutes from "./routes/lead-route.js";
import { errorHandler } from "./middlewares/error-middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;