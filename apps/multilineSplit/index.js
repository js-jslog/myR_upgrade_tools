"use strict"

const multilineSplit = function (input, callback) {
    if (std) {
        const arr = input.split(/\r?\n/);
        callback(arr, input);
    }
};

exports.multilineSplit = multilineSplit;
