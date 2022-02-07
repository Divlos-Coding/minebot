const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const nameHistory = require("./nameHistory.js");
const replacer = require("./replacer.js");

function join (player, client) {
    const joinEmbed = new MessageEmbed()
        .setColor("#00ff00")
        .setAuthor({ name: player.username + " joined the game.", iconURL: "https://mc-heads.net/avatar/" + player.username});
    client.channels.cache.get(config.discord.channelID).send({ embeds: [joinEmbed]});
};

function leave (player, client) {
    const leaveEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setAuthor({ name: player.username + " left the game.", iconURL: "https://mc-heads.net/avatar/" + player.username});
    client.channels.cache.get(config.discord.channelID).send({ embeds: [leaveEmbed]});
};

function adv (player, adv, text, client) {
    const leaveEmbed = new MessageEmbed()
        .setColor("#ffff00")
        .setAuthor({ name: player + text + adv, iconURL: "https://mc-heads.net/avatar/" + player});
    client.channels.cache.get(config.discord.channelID).send({ embeds: [leaveEmbed]});
};

function death (player, death, client) {
    const leaveEmbed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor({ name: player + " died!", iconURL: "https://mc-heads.net/avatar/" + player})
        .setDescription("**Death Cause:** `" + death + "`");
    client.channels.cache.get(config.discord.channelID).send({ embeds: [leaveEmbed]});
};

async function names (player) {
    let names = "" + await nameHistory.getNameHistory(player);
    const array = names.split(" | ")
    let arrayRegex;
    console.log("Regex: " + arrayRegex + "array: " + array);
    const namesEmbed = new MessageEmbed()
        .setColor("#007D96")
        .setAuthor({ name: player + " name history:", iconURL: "https://mc-heads.net/avatar/" + player})
    for (let i = 0; i < Object.keys(array).length; i++) {
        arrayRegex = array[i].match(/^Name ([0-9:]+) ([a-zA-Z0-9_]+) (.+)$/);
        namesEmbed.addField(arrayRegex[2], arrayRegex[3]);
    };
    return await namesEmbed;
};


module.exports = {join, leave, adv, death, names};