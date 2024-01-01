import { NextFunction, Request, Response } from "express";
import payload from "payload";

/**
 * Logs the request URL
 *
 * @param {Request} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
function logRequest(req: Request, _res: Response, next: NextFunction): void {
    payload.logger.info(`Request URL: ${req.url}`);
    next();
}

export default logRequest;