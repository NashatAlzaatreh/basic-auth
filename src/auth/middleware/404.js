"use strict";

function handler404(req, res, next) {
  const errorObject = {
    error: 404,
    message: "Path not found 🚫🔍",
  };

  res.status(404).json(errorObject);
}

module.exports = handler404;
