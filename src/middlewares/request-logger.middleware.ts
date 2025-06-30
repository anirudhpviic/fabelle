import { NextFunction, Request, Response } from "express";
import LogsSchema from "../schemas/logs.schema"

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = await LogsSchema.create({
            method: req.method,
            path: req.originalUrl,
            headers: req.headers,
            body: req.body,
            query: req.query,
        })
        res.on("finish", async () => {
            log.status = res.statusCode
            await log.save()
        })
    } catch (error) {
        console.error('Error logging request:', error);
        next(error)
    }

    next();
}