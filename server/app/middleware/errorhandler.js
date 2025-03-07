import { AppError } from "../utils/AppError.js";



/**
 * Express global error handler.
 * Logs errors and sends structured JSON responses.
 *
 * @param {object} err - Thrown error object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function (unused).
 * 
 * @returns {void} Sends a JSON error response.
 */


const erroHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500 ;

    const errorResponse = {
        success: false,
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
        stack: err.stack ? err.stack : undefined
    }

   return res.status(statusCode).json(errorResponse);

}

export default erroHandler;