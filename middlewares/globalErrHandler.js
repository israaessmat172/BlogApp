const globalErrHandler = (err, req, res, next) => {
  //status
  //message
  //stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err?.statusCode ? err.statusCode : 500;

  //send the response
  res.status(statusCode).json({
    stack,
    status,
    message,
  });

  console.log(err.stack);
};

module.exports = globalErrHandler;
