import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth-route.js";
import leadRoutes from "./routes/lead-route.js";
import { errorHandler } from "./middlewares/error-middleware.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: process.env.CLIENT_URL || true,
		credentials: true
	})
);

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	max: 100
// });

// app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/leads", leadRoutes);

app.use(errorHandler);

export default app;