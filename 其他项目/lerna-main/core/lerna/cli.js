#!/usr/bin/env node

"use strict";

/* eslint-disable import/no-dynamic-require, global-require */
const importLocal = require("import-local");

if (importLocal(__filename)) {
  require("npmlog").info("cli", "using local version of lerna12321312");
} else {
  require("npmlog").info("cli", "using lo2222222222222222222222222");
  require(".")(process.argv.slice(2));
}
