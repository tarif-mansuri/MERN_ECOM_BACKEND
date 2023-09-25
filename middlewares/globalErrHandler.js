const globalErrorHandler = (error, req, res, next)=>{
    const stack = error?.stack;
    const message = error?.message;
    res.json({
        stack,
        message
    });
}

module.exports = globalErrorHandler;