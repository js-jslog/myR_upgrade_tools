"use strict"

const execShell = require("../../execShell/execShell.js");

const getTagList = function (params, callback) {
    execShell.execShell("./apps/paramGatherer/tagListGetter/getTagList.sh", {sapphire_dir: params.sapphire_dir}, function (input) {
        params.available_tags = input.split(/\r?\n/);
        callback();
    });
};

exports.getTagList = getTagList;
