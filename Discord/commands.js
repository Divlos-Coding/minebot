const config = require("../config.json");
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);

function injectCMD(client) {
    client.on("ready", () => {
        if (config.discord.channelID == null) {throw new Error("Please write the ChannelID in config.json.");};
        let commands;
        const guild = client.guilds.cache.get(config.discord.guildID);
        if (config.discord.features.commands == false) return;
        if (guild) {
            commands = guild.commands;
        } else {
            commands = client.application?.commands;
        };
        commands?.create({
            name: "tps",
            description: "Sends the server TPS."
        });
        commands?.create({
            name: "position",
            description: "Sends the bot position."
        });
        commands?.create({
            name: "list",
            description: "Sends the server playerlist."
        });
    });
};

function injectRSP(client, bot) {
    client.on("interactionCreate", async (interaction) => {
        if (config.discord.features.commands == false) return;
        if (!interaction.isCommand()) return;
        const { commandName, options } = interaction;
        const playerList = Object.keys(bot.players).join(", ");
        bot.loadPlugin(tpsPlugin);
        if (commandName == "tps") {
            interaction.reply({
                content: "**Current server TPS: **" + bot.getTps(),
                ephemeral: true
            })
        };
        if (commandName == "position") {
            interaction.reply({
                content: "**Current bot position: **" + bot.entity.position,
                ephemeral: true
            })
        };
        if (commandName == "list") {
            interaction.reply({
                content: "**Online Players: **" + playerList,
                ephemeral: true
            });
        };
    });
};

module.exports = {injectCMD, injectRSP}; 