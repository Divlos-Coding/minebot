const config = require("../config.json");
const owners = require("../owners.json");
const embeds = require("../lib/embeds.js");
const splitter = require("../lib/splitter.js");
const replacer = require("../lib/replacer.js");

function DiscordToMinecraft (client, bot) {
    if (config.discord.features.chat == false) return;
    client.on("messageCreate", message => {
        if (message.author.id == client.user.id) return;
        bot.chat(message.content);
    });
};

function MinecraftToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on("chat", (username, message) => {
        if (username == "you" || owners.includes(username)) {
            if (message.includes("TPS") || message.includes("tps") || message.includes("send") || message.includes("pos")) return;
        };
        client.channels.cache.get(config.discord.channelID).send(`**${username}:** ${message}`);
    })
};

function JoinToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on('playerJoined', (player) => {
        embeds.join(player, client);
    });
};

function DeathToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on('playerDeath', (data) => {
        console.log(data.victim.detail().username);
        console.log(replacer.replaceDeath(data.deathType));
        embeds.death(data.victim.detail().username, replacer.replaceDeath(data.deathType), client);
    });
};

function LeaveToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on('playerLeft', (player) => {
        embeds.leave(player, client);
    });
};

function AdvToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on("chat:adv1", matches => {
        const player = splitter.splitMSGName(matches[0]);
        const adv = splitter.splitMSGMessage(matches[0]);
        embeds.adv(player, adv, " has made the advancement ", client);
    });
    bot.on("chat:adv2", matches => {
        const player = splitter.splitMSGName(matches[0]);
        const adv = splitter.splitMSGMessage(matches[0]);
        embeds.adv(player, adv, " has completed the challenge ", client);
    });
};

module.exports = { DiscordToMinecraft, MinecraftToDiscord, JoinToDiscord, LeaveToDiscord, AdvToDiscord, DeathToDiscord };