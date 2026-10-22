import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import productsRoutes from "./routes/products.routes.js";
import {requireAuth} from "./middlewares/requireAuth.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    }),
);

app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/products', requireAuth, productsRoutes);
export default app;