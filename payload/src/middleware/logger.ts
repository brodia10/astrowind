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
    // Determine the protocol based on req.secure
    const protocol = req.secure ? 'https://' : 'http://';

    // Construct the full URL by using the determined protocol, host header, and the original URL of the request.
    const fullUrl = new URL(req.url, `${protocol}${req.headers.host}`).href;

    // Log the method and the full URL
    payload.logger.info(`${req.method} ${fullUrl} (${_res.statusCode})`);

    // Call the next middleware in the stack
    next();
}


export default requestLoggingMiddleware;