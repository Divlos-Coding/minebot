function splitMSGName(string) {
    let name = "" + string;
    name = name.split(",");
    return name[0];
}

function splitMSGMessage(string) {
    let message = "" + string;
    message = message.split(",");
    return message[1];
}

module.exports = {splitMSGName, splitMSGMessage};