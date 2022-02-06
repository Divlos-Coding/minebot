const fs = require("fs");

const mineflayer = require("mineflayer");
const { setTimeout } = require("timers");
const config = require("./config.json");
const regexMSG = new RegExp(config.options.regexMSG);

const { Client, Intents } = require("discord.js");
const intents = new Intents(["GUILDS", "GUILD_MESSAGES", Intents.FLAGS.GUILDS]);
const client = new Client({intents: intents});
const discordCMD = require("./Discord/commands.js");
const discordLogin = require("./Discord/login.js");
const discordChat = require("./Discord/chat.js");
const deathEvent = require("mineflayer-death-event");

if (process.argv.length < 3 && config.options.IP == undefined) {
    throw new Error("There is no server specified, either via command line arguments or in config.json");
};

const address = process.argv.length >= 3 ? process.argv[2] : config.options.IP + ":" + (config.options.port != undefined ? config.options.port : 25565);

// Delete all the Scripts from the cache.
function deleteScripts() {
    fs.readdirSync("./Scripts").forEach((file) => {
        delete require.cache[require.resolve("./Scripts/" + file)];
    });
};

// Create the bot.
function createBot() {
    const bot = mineflayer.createBot({
        host: address.includes(":") ? address.slice(0, address.indexOf(":")) : address,
        port: address.includes(":") ? parseInt(address.slice(address.indexOf(":")+1)) : undefined,
        username: config.options.username,
        password: config.options.password,
        auth: config.options.authentication,
        version: config.options.version
    });

    bot.loadPlugin(deathEvent);

    bot.once("spawn", () => {
        if (config.options.regexMSG != "default") {
            bot.addChatPattern("customMSG", regexMSG, { parse: true, repeat: true });
        };
        bot.addChatPattern("adv1", /^([a-zA-Z0-9_]+) has made the advancement (.+)$/, { parse: true, repeat: true });
        bot.addChatPattern("adv2", /^([a-zA-Z0-9_]+) has completed the challenge (.+)$/, { parse: true, repeat: true });
        bot.addChatPattern("death", /^([a-zA-Z0-9_]+) has completed the challenge (.+)$/, { parse: true, repeat: true });
        discordChat.JoinToDiscord(client, bot);
        discordChat.LeaveToDiscord(client, bot);
        fs.readdirSync("./Scripts").forEach((file) => {
            const script = require("./Scripts/" + file);
            if (script.inject != null) {
                if (script.options != null) {
                    Object.keys(script.options).forEach((key) => {
                        if (!(key in bot.options)) {
                            bot.options[key] = script.options[key];
                        };
                    });
                };
                script.inject(bot);
            } else {
                throw new Error("Script " + file + " doesn't have an inject function!");
            };
        });
    });

    bot.on("error", (error) => {
        throw new Error(error.stack);
    });

    bot.on("end", () => {
        deleteScripts();
        setTimeout(createBot, 60000);
    });

    // Setting up Discord bot.
    if (config.discord.enable == true) {
        discordCMD.injectCMD(client);
        discordLogin.login(client);
        discordCMD.injectRSP(client, bot);
        discordChat.DiscordToMinecraft(client, bot);
        discordChat.MinecraftToDiscord(client, bot);
        discordChat.AdvToDiscord(client, bot);
        discordChat.DeathToDiscord(client, bot);
    };
};

createBot();