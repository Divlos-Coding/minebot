const config = require("../config.json");
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const embed = require("../lib/embeds.js");
const { MessageEmbed } = require("discord.js");

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
        commands?.create({
            name: "names",
            description: "Sends the name history of targeted player",
            options: [
                {
                    name: "username",
                    description: "Insert the name of target player",
                    type: "STRING",
                    required: true
                }
            ]
        })
    });
};

async function injectRSP(client, bot) {
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
        if (commandName == "names") {
            const name = options.getString("username");
            let output = await embed.names(name);
            await interaction.reply({
                embeds: [output]
            });
        };
    });
};

module.exports = {injectCMD, injectRSP};