"use strict"

const execShell = require("../execShell/execShell.js");

const getChangedFileList = function (params, callback) {
    execShell.execShell("./apps/shellRunner/gitDiffer/gitDiffNameOnly.sh", params, callback);
};

exports.getChangedFileList = getChangedFileList;
