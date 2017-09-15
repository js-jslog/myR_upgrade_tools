"use strict"

const gatherParams = require("../shellRunner/index.js").gatherParams;
const getChangedFileList = require("../shellRunner/index.js").getChangedFileList;
const getObjectUseReport = require("../clientCodeScanner/index.js").getObjectUseReport;
var params = {};

const produceObjectUseReport = function () {
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
    getObjectUseReport(input, params);
};

exports.produceObjectUseReport = produceObjectUseReport;
