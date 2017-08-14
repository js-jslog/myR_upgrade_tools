"use strict"

const execShell = require("../execShell/execShell.js");

const gitDiffer = function (params, callback) {
    execShell.execShell("./apps/gitDiffer/gitDiff.sh", params, callback);
};

exports.gitDiffer = gitDiffer;
