function replace (replaceThis, replaceRegex, replaceWith) {
    const replaced = replaceThis.toString().replace(replaceRegex, replaceWith);
    return replaced;
};

function replaceDeath(string) {
    let death;
    death = string.toString().replace(".", " ");
    for (let i = 0; i < 5; i++) {
        death = death.replace(".", " ");
    }
    return death;
}

module.exports = {replace, replaceDeath};