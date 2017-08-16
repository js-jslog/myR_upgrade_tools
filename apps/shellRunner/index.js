"use strict"

const gitDiffer = require("./gitDiffer/index.js");
const paramGatherer = require("./paramGatherer/index.js");
const projectGrepper = require("./projectGrepper/index.js");

module.exports = {
    getChangedFileList: gitDiffer.getChangedFileList,
    gatherParams: paramGatherer.gatherParams,
    getGrepResults: projectGrepper.getGrepResults,
};
