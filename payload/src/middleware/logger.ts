import { NextFunction, Request, Response } from "express";
import payload from "payload";

/**
 * Logs the request URL
 *
 * @param {Request} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
function requestLoggingMiddleware(req: Request, _res: Response, next: NextFunction): void {
    payload.logger.info(`request: ${req.method} ${req.url}`)
    next();
}

export default requestLoggingMiddleware;