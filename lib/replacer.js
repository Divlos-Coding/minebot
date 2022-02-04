function replaceSend(string) {
    const message = string.toString().replace(/send /, "");
    return message;
}

module.exports = {replaceSend};