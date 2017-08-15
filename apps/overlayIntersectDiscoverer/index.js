"use strict"

// 1. Get folder location
// 2. Get names of tags to diff
// 3. Perform diff and pipe results in to array
// 4. Regex the filename out of each line and grep a project for those references
// 5. Summarise by outputting a file which identifies each search and how many results it had

const paramGatherer = require("../paramGatherer/index.js");
const gitDiffer = require("../gitDiffer/index.js");
const clientCodeScanner = require("../clientCodeScanner/index.js");

const entryPoint = function () {
    var params = {};
    paramGatherer.gatherParams(params, function () {
        gitDiffer.gitDiffer({
            first_tag: params.first_tag,
            second_tag: params.second_tag,
            sapphire_dir: params.sapphire_dir,
        }, function (input) {
            clientCodeScanner.summarise(input, params);
        });
    });
};

entryPoint();
