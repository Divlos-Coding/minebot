const getJSON = require("./getJSONFromURL.js");

async function getUUID (player) {
    let uuid = await getJSON.getJSON("https://api.mojang.com/users/profiles/minecraft/" + player);
    return await uuid.id;
};

module.exports = {getUUID};