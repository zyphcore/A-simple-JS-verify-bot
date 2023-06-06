const client = require("../index");

client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
    client.user.setPresence({
        status: "idle",  //You can show online, idle....
        game: {
            name: "zyph#0001",  //The message shown
            type: "STREAMING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
 });
