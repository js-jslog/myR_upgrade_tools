"use strict"

const projectGrepper = require("../projectGrepper/index.js");
const multilineSplit = require("../multilineSplit/index.js");

// TODO: improve to remove undefined values in returned array
const summarise = function (input, params) {
    const rgx = /([^\/]*)\.js/;
    const file_names = input.split(/\r?\n/).map(function (line) {
        var arr = line.match(rgx) || [];
        return arr[1] || "DO_NOT_SEARCH";
    });
    const exclusions = [
        "load",
        "db_updates",
    ];
    console.log("Files changed: " + file_names.length);
    file_names.forEach(function (file_name) {
        if (exclusions.indexOf(file_name) > -1) {
            return;
        }
        const params_local = {
            search_term: file_name,
            project_path: params.client_dir,
        };
        projectGrepper.projectGrepper(params_local, projectGrepperCallback);
    });
};

const projectGrepperCallback = function (input, params) {
    if (input) {
        const arr = input.split(/\r?\n/);
        console.log(params.search_term + ": " + arr.length);
    }
};

exports.summarise = summarise;
