/**
 * Async error handling middleware wrapper.
 * @param {Function} fn - Async route handler function.
 * @returns {Function} Express route handler with error catching.
 */

const asyncHandler = (fn) => (req,res,next)=>{
    return Promise.resolve(fn(req,res,next)).catch(next);
};

export default asyncHandler;
