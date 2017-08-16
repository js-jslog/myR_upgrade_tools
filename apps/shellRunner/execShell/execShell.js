const execProcess = require("./execProcess.js");

const execShell = function (file, params, cb) {
    var command = "sh " + file + " ";
    if (params) {
        const param_str = Object.keys(params).map(function (key) {
            return params[key];
        }).join(" ");
        command = command + " " + param_str;
    }
    const callback = cb || console.log;
    execProcess.result(command, function(err, response){
        if(!err){
            cb(response, params);
        } else {
            // TODO: this has been commented out because 
            // the shell script seems to fail if it doesn't 
            // produce any results, and then I don't want 
            // to print anything out of course. Need to make 
            // the shell script return without failure
            // console.log(err.toString());
        }
    });
};

exports.execShell = execShell;
