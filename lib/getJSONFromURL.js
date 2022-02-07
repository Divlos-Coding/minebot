const fetch = require("node-fetch");

async function getJSON(url) {
    try {
        return await fetch(url) .then(res => res.json()) .then(jsonData => {
            return jsonData;
        });
    } catch {
        return "Invalid JSON";
    }
};

module.exports = {getJSON};