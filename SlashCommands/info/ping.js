const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "zyph",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `# Verification!.
		please verify with the following template.
		UserID: 
		Why should we whitelist you:
		Who invited you:
		
		**Example**
		UserID: 551017318071795716
		Why should we whitelist you: Im very active, im fun and i can help with many stuff.
		Who invited you: <@551017318071795716> the owner of the server.
		
		*Please note: you can only send a message once a 6 hours. if we decide to blacklist you, you wont be able to join back.*` });
    },
};
