const config = require("../config.json");
const splitter = require("../lib/splitter.js");
const checker = require("../lib/msgChecker.js");
const mineflayer = require("mineflayer");
const tpsPlugin = require('mineflayer-tps')(mineflayer);

function inject(bot) {
    if (config.scripts.msgCommands == false) return;
    bot.loadPlugin(tpsPlugin);
    if (config.options.regexMSG == "default") {
        bot.on("whisper", (username, message) => {
            checker.msgChecker(bot, username, message);
        });
    } else {
        bot.on("chat:customMSG", matches => {
            const name = splitter.splitMSGName(matches[0]);
            const message = splitter.splitMSGMessage(matches[0]);
            checker.msgChecker(bot, name, message);
        });
    };
};

module.exports = {inject};