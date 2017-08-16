"use strict"

const getGrepResults = require("../shellRunner/index.js").getGrepResults;
const multilineSplit = require("../multilineSplit/index.js");
var instance_params;

const getObjectUseReport = function (input, params, callback) {
    instance_params = params;
    const object_list = splitAndFilterInput(input);
    searchProjectForObjects(object_list, callback);
};

const splitAndFilterInput = function (input, callback) {
    const rgx = /([^\/]*)\.js/;
    const exclusions = [
        "load",
        "db_updates",
        "DO_NOT_SEARCH",
    ];
    const file_names = input.split(/\r?\n/).map(function (line) {
        var arr = line.match(rgx) || [];
        return arr[1] || "DO_NOT_SEARCH";
    }).filter(function (term) {
        return (exclusions.indexOf(term) === -1);
    });
    console.log("Files changed: " + file_names.length);
    return file_names;
};


const searchProjectForObjects = function (object_list) {
    object_list.forEach(function (object) {
        const params_local = {
            search_term: object,
            project_path: instance_params.client_dir,
        };
        getGrepResults(params_local, composeReport);
    });
};

const composeReport = function (input, params) {
    if (input) {
        const arr = input.split(/\r?\n/);
        console.log(params.search_term + ": " + arr.length);
    }
};

exports.getObjectUseReport = getObjectUseReport;
