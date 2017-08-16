"use strict"

const getGrepResults = require("../shellRunner/index.js").getGrepResults;
const multilineSplit = require("../multilineSplit/index.js");

// TODO: improve to remove undefined values in returned array
const summarise = function (input, params) {
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
    file_names.forEach(function (file_name) {
        const params_local = {
            search_term: file_name,
            project_path: params.client_dir,
        };
        getGrepResults(params_local, projectGrepperCallback);
    });
};

const projectGrepperCallback = function (input, params) {
    if (input) {
        const arr = input.split(/\r?\n/);
        console.log(params.search_term + ": " + arr.length);
    }
};

exports.summarise = summarise;
