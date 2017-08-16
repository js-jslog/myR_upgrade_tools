"use strict"

// 1. Get folder location
// 2. Get names of tags to diff
// 3. Perform diff and pipe results in to array
// 4. Regex the filename out of each line and grep a project for those references
// 5. Summarise by outputting a file which identifies each search and how many results it had

const gatherParams = require("../shellRunner/index.js").gatherParams;
const getChangedFileList = require("../shellRunner/index.js").getChangedFileList;
const clientCodeScanner = require("../clientCodeScanner/index.js");
var params = {};

const getParams = function () {
    gatherParams(params, getSapphireChanges);
};

const getSapphireChanges = function () {
    const git_differ_params = {
        first_tag: params.first_tag,
        second_tag: params.second_tag,
        sapphire_dir: params.sapphire_dir,
    };
    getChangedFileList(git_differ_params, getClientUses);
};
    
const getClientUses = function (input) {
    clientCodeScanner.summarise(input, params);
};

getParams();
