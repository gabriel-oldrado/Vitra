import {Router} from "express";
import { listProducts } from "../services/products.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await listProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Não foi possível listar os produtos" });
    }
});

export default router;