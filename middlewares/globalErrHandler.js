const globalErrorHandler = (error, req, res, next)=>{
    const stack = error?.stack;
    const message = error?.message;
    const status = error?.status? error.status:500;
    res.status(status).json({
        stack,
        message
    });
}

module.exports.geHandler = globalErrorHandler;

const notFoundHandler = (req, res, next)=>{
    const error = new Error(`Route ${req.originalUrl} not found`);
    next(error);
}

module.exports.nfHandeler = notFoundHandler;