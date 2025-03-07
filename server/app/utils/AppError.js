/**
 * Base application error class
 * @extends {Error}
 */
export class AppError extends Error {
    /**
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Distinguishes from system errors
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

/**
 * Validation Error (400)
 */
export class ValidationError extends AppError {
    constructor(message = "Validation failed") {
        super(message, 400);
    }
}

/**
 * Database Error (500)
 */
export class DatabaseError extends AppError {
    constructor(message = "Database error") {
        super(message, 500);
    }
}
