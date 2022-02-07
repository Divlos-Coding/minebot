const owners = require("../owners.json");
const replacer = require("./replacer.js");
const nameHistory = require("./nameHistory.js");
const fs = require("fs");

async function msgChecker (bot, name, message) {
    if (owners.includes(name)) {
        if (message == "pos") {
            bot.whisper(name, "My current pos is: " + bot.entity.position);
        };
        if (message.includes("send")) {
            bot.chat(replacer.replace(message, /send /, ""));
        };
        if (message == "tps") {
            bot.whisper(name, "Current TPS: " + bot.getTps());
        };
        if (message.includes("addowner")) {
            var owner = replacer.replace(message, /addowner /, "");
            fs.readFile('owners.json',function(err,content){
                if(err) throw err;
                var parseJson = JSON.parse(content);
                parseJson.push(owner)
                fs.writeFile('owners.json',JSON.stringify(parseJson),function(err){
                  if(err) throw err;
                })
            });
            bot.whisper(name, "Added " + owner + " to the owner list.");
        };
        if (message.includes("test")) {
            const list = "" + await nameHistory.getNameHistory(replacer.replace(message, /test /, ""))
            bot.whisper(name, list);
        };
    };
};

module.exports = { msgChecker };