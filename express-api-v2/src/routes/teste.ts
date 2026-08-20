import { Router } from "express";

export const getTesteRouter = () => {
    const router = Router();
    const startTime = new Date();

    router.get("/info", (req, res) => {
        res.status(200).json({
            startTime: startTime.toISOString()
        });
    });

    return router;
};