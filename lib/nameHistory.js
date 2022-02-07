const getUUID = require("./getUUID.js");
const { getJSON } = require("./getJSONFromURL");

async function getNameHistory(player) {
    const uuid = await getUUID.getUUID(player);
    console.log(uuid);
    if (uuid != null) {
        const names = await getJSON("https://api.mojang.com/user/profiles/" + uuid + "/names")
        let list;
        let date;
        if (Object.keys(names).length > 1) {
            for (let i = 0; i < Object.keys(names).length; i++) {
                let outName = names[i].name + "";
                let outTime = new Date(names[i].changedToAt).toLocaleDateString("en-US");
                if (outTime.toString() == "Invalid Date") {
                    date = "Original";
                } else {
                    date = new Date(names[i].changedToAt).toLocaleDateString("en-US");
                }
                if (list != null) {
                    list = list + " | Name " + (i+1) + ": " + outName + " (" + date + ")";
                } else {
                    list = "Name " + (i+1) + ": " + outName + " (" + date + ")";
                }
            };
        } else {
            list = "Name 1: " + names[0].name + " (Original)";
        };
        return await list;
    } else {
        return await "Username doesn't exist.";
    };
};

module.exports = {getNameHistory};