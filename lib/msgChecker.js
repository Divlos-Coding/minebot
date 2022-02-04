const config = require("../config.json");
const replacer = require("./replacer.js");

function msgChecker (bot, name, message) {
    if (config.owners.includes(name)) {
        if (message == "pos") {
            bot.whisper(name, "My current pos is: " + bot.entity.position);
        };
        if (message.includes("send")) {
            bot.chat(replacer.replaceSend(message));
        };
        if (message == "tps") {
            bot.whisper(name, "Current TPS: " + bot.getTps());
        };
    };
};

module.exports = { msgChecker };