const mongoose = require("mongoose");
// !Testing Mode
// Middleware to start a Mongoose session with a transaction
exports.withTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  req.transactionSession = session;
  next();
};

// Middleware to commit or abort the transaction and end the session
exports.endTransaction = async (req, res, next) => {
  if (req.transactionSession) {
    try {
      await req.transactionSession.commitTransaction();
    } catch (error) {
      await req.transactionSession.abortTransaction();
      console.error(error);
      return next(error); // Pass the error to the error-handling middleware
    } finally {
      req.transactionSession.endSession();
    }
  }
  next(); // Continue to the next middleware or route handler
};
