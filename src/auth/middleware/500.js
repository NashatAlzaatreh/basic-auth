"use strict";

function handler500(req, res, next) {
  const error = err.message ? err.message : err;

  const errorObject = {
    error: 500,
    message: error,
  };

  res.status(500).json(errorObject);
}

module.exports = handler500;
