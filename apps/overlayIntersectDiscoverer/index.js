"use strict"

// 1. Get folder location
// 2. Get names of tags to diff
// 3. Perform diff and pipe results in to array
// 4. Regex the filename out of each line and grep a project for those references
// 5. Summarise by outputting a file which identifies each search and how many results it had

const projectGrepper = require("../projectGrepper/index.js");
const gitDiffer = require("../gitDiffer/index.js");
const project_path = "C:/Apps/R6_11/webapps/cptg_devt";
var index = 0;
const projectGrepperCallback = function (input, params) {
    if (input) {
        index = index + 1;
        const arr = input.split(/\r?\n/);
        console.log(params.search_term + ": " + arr.length);
    }
};
// TODO: improve to remove undefined values in returned array
const searchTermBuilder = function (input) {
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
        const params = {
            search_term: file_name,
            project_path: project_path,
        };
        projectGrepper.projectGrepper(params, projectGrepperCallback);
    });
};
gitDiffer.gitDiffer({a: "R6_19_22", b: "R6_22_7"}, searchTermBuilder);
