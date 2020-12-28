(async () => {
    const fetch = require("node-fetch")
    let status = await fetch(`https://discord.com/api/v8/applications/${process.env.DISCORD_APPID}/commands`,
        {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    )

    console.log(await status.json())
})()