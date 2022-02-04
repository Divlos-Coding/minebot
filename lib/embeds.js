const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

function join (player, client) {
    const joinEmbed = new MessageEmbed()
        .setColor("#00ff00")
        .setAuthor({ name: player.username + " joined the game.", iconURL: "https://crafatar.com/avatars/" + player.uuid});
    client.channels.cache.get(config.discord.channelID).send({ embeds: [joinEmbed]});
};

function leave (player, client) {
    const leaveEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setAuthor({ name: player.username + " left the game.", iconURL: "https://crafatar.com/avatars/" + player.uuid});
    client.channels.cache.get(config.discord.channelID).send({ embeds: [leaveEmbed]});
};

module.exports = { join, leave };