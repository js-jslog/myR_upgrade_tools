"use strict"

// runs a grep command for a search term & in a folder passed
// as parameters
const execShell = require("../execShell/execShell.js");

const getGrepResults = function (params, callback) {
    if (!params || !params.search_term || !params.project_path || !callback) {
        throw {
            value: "insufficient parameters",
            message: "projectGrepper requires a params.search_term, params.project_path and callback parameters",
            toString: function () {
                return this.value + ": " + this.message;
            },
        };
    }
    execShell.execShell("./apps/shellRunner/projectGrepper/runGrep.sh", params, callback);
};

exports.getGrepResults = getGrepResults;
