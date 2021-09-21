/** BizTime express application. */


const express = require("express");

const ExpressError = require("./expressError")
const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");

const app = express();


app.use(express.json());
app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);


/** 404 handler */

app.use(function (request, response, next) {
  const error = new ExpressError("Not Found", 404);
  return next(error);
});

/** general error handler */

app.use((error, request, response, next) => {
  response.status(error.status || 500);

  return response.json({
    error: error,
    message: error.message
  });
});


module.exports = app;
