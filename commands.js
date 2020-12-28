const parse = require("csv-parse/lib/sync")
if(fetch == undefined)
    var fetch = require("node-fetch")

/**
 * Fetch weather by an ICAO airport code
 * @param {Object} arg
 * @param {string} arg.stationstring - (Roughly) ICAO Airport code for weather report
 * @param {number} [arg.hoursbefore] - Hours before to search for weather
 * @param {boolean} [arg.asRaw] - Show raw METAR string
 */
async function weather({stationstring, hoursbefore = 1, asRaw = true}){
    const url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?"+
        "dataSource=metars&requestType=retrieve&format=csv&"+
        `stationString=${encodeURIComponent(stationstring)}&hoursBeforeNow=${hoursbefore}`
    const weather = await fetch(url).then(resp => resp.text())
    const weather_split = weather.split("\n")
    const header = weather_split.slice(0, 5)
    const body = parse(weather_split.slice(5).join("\n"), {columns: true, to_line: 26})
    console.log(url)
    console.log(header)
    const fields = body.map((report) => {
            return {name: report.station_id, value: report.raw_text}
        })
    var embed = {
        content: "",
        embeds: [{
            title: stationstring,
            fields,
            footer: {
                text: `${header[2]}: ${header[4]}`
            }
        }]
    }
    return embed
}


module.exports = {
    weather
}