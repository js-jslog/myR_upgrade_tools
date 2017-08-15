"use strict"

const inquirer = require("inquirer");
const tagListGetter = require("../tagListGetter/index.js");

const gatherParams = function (params, callback) {
    getUpgradeDirectory(params, function () {
        getSapphireFolderLocation(params, function () {
            getRevisionNames(params, callback);
        });
    });
};
const printPromiseError = function (err) {
    console.log("promise failed: " + err);
};
const registerDirPrompt = function (name, message, params, callback) {
    inquirer.registerPrompt("directory", require("inquirer-select-directory"));
    inquirer.prompt([{
        type: "directory",
        name: name,
        message: message,
        basePath: ".",
    }]).then(function (answers) {
        params[name] = answers[name];
        callback();
    }).catch(printPromiseError);
};
const registerChoicePrompt = function (name, message, choices, params, callback) {
    inquirer.prompt([{
        type: "list",
        name: name,
        message: message,
        choices: choices
    }]).then(function (answers) {
        params[name] = answers[name];
        callback();
    }).catch(printPromiseError);
};

const getUpgradeDirectory = function (params, callback) {
    registerDirPrompt("client_dir", "Select the client directory which is being upgraded", params, callback);
};
const getSapphireFolderLocation = function (params, callback) {
    registerDirPrompt("sapphire_dir", "Select any sapphire folder", params, callback);
};
const getRevisionNames = function (params, callback) {
    tagListGetter.getTagList(params, function () {
        getFirstTag(params, function () {
            getSecondTag(params, function () {
                callback();
            });
        });
    });
};
const getTags = function (sapphire_folder, callback) {
    getFirstTag(sapphire_folder, function () {
        getSecondTag(sapphire_folder, callback);
    });
};

const getFirstTag = function (params, callback) {
    registerChoicePrompt("first_tag", "Select the from revision tag", params.available_tags, params, callback);
};
const getSecondTag = function (params, callback) {
    registerChoicePrompt("second_tag", "Select the to revision tag", params.available_tags, params, callback);
};

exports.gatherParams = gatherParams;
