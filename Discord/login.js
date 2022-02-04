const discordCMD = require("./commands.js");
const config = require("../config.json");

function login(client) {
    discordCMD.injectCMD;
    client.login(config.discord.botToken);
}

module.exports = {login};