const config = require("../config.json");
const embeds = require("../lib/embeds.js");

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
        if (username == "you" || config.owners.includes(username)) {
            if (message.includes("TPS") || message.includes("tps") || message.includes("send") || message.includes("pos")) return;
        };
        client.channels.cache.get(config.discord.channelID).send(`**${username}:** ${message}`);
    })
}

function JoinToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on('playerJoined', (player) => {
        embeds.join(player, client);
    });
}

function LeaveToDiscord (client, bot) {
    if (config.discord.features.chat == false) return;
    bot.on('playerLeft', (player) => {
        embeds.leave(player, client);
    });
}

module.exports= { DiscordToMinecraft, MinecraftToDiscord, JoinToDiscord, LeaveToDiscord };