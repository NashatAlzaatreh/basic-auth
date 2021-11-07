"use strict";

"use strict";

const { start } = require("./src/server");
const { db } = require("./src/auth/models/index");

db.sync()
  .then(() => {
    start();
  })
  .catch(console.error);
