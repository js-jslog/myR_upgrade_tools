"use strict"

const inquirer = require("inquirer");

const printPromiseError = function (err) {
    console.log("promise failed: " + err);
};
const registerDirPrompt = function (options, params, callback) {
    inquirer.registerPrompt("directory", require("inquirer-select-directory"));
    inquirer.prompt([{
        type: "directory",
        name: options.name,
        message: options.message,
        basePath: ".",
    }]).then(function (answers) {
        params[options.name] = answers[options.name];
        callback();
    }).catch(printPromiseError);
};
const registerChoicePrompt = function (options, params, callback) {
    inquirer.prompt([{
        type: "list",
        name: options.name,
        message: options.message,
        choices: options.choices
    }]).then(function (answers) {
        params[options.name] = answers[options.name];
        callback();
    }).catch(printPromiseError);
};

exports.registerDirPrompt = registerDirPrompt;
exports.registerChoicePrompt = registerChoicePrompt;
