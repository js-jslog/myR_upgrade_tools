"use strict"

const tagListGetter = require("./tagListGetter/index.js");
const promptCreator = require("./promptCreator/index.js");

const gatherParams = function (params, callback) {
    getUpgradeDirectory(params, function () {
        getSapphireFolderLocation(params, function () {
            getRevisionNames(params, callback);
        });
    });
};

const getUpgradeDirectory = function (params, callback) {
    const options = {
        name: "client_dir",
        message: "Select the client directory which is being upgraded",
    };
    promptCreator.registerDirPrompt(options, params, callback);
};
const getSapphireFolderLocation = function (params, callback) {
    const options = {
        name: "sapphire_dir",
        message: "Select any sapphire folder",
    };
    promptCreator.registerDirPrompt(options, params, callback);
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
    const options = {
        name: "first_tag",
        message: "Select the from revision tag",
        choices: params.available_tags,
    };
    promptCreator.registerChoicePrompt(options, params, callback);
};
const getSecondTag = function (params, callback) {
    const options = {
        name: "second_tag",
        message: "Select the to revision tag",
        choices: params.available_tags,
    };
    promptCreator.registerChoicePrompt(options, params, callback);
};

exports.gatherParams = gatherParams;
