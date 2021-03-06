const MessageEmbed = require("discord.js/src/structures/MessageEmbed")

/**
 * Fetch weather from wttr.in
 * @param {Object} arg
 * @param {string} arg.location - Area to fetch weather for
 */
async function weather({location}){
    const resp = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`).then(resp => resp.json())
    const area = resp.nearest_area[0]
    var embed = new MessageEmbed()
            .setTitle(`Weather in ${area.areaName[0].value}, ${area.region[0].value}`)
            .setDescription(resp.current_condition[0].weatherDesc[0].value)
            .addField("Feels Like", `${resp.current_condition[0].FeelsLikeC} \u2103`)
            .addField("Cloud Cover", resp.current_condition[0].cloudcover)
            .addField("Wind",`${resp.current_condition[0].windspeedMiles} mph @ ` +
                    resp.current_condition[0].winddir16Point)
            .setFooter(resp.current_condition[0].localObsDateTime)
    return {
        content: "",
        embeds: [embed.toJSON()]
    }
}

/**
 * Replies with user display name
*/
async function ping({}, {user}){
    return `Pong ${user.nick || user.user.username}`
}

module.exports = {
    weather,
    ping
}