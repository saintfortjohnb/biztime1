/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

// Import Routes
const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");

// Register Routes
app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
