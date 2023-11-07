import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/_____", async (request: Request, response: Response, next: NextFunction) => {
    try {

    }
    catch (err: any) {
        next(err);
    }
});

export default router;