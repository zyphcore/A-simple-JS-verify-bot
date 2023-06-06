const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'verify',
	/**
	 *@param {Client} client
	 *@param {Message} message
	 *@param {String[]} args
	 */
    run : async(client, message, args) => {
		const member = message.mentions.members.first();
		const messages = message.channel.messages.fetch();
		const role = message.guild.roles.cache.find(r => r.name === "verified");	
					 
        //next we define some variables
        if(!member) return message.channel.send('No member specified') //when no member is pinged
        if(!role) return message.channel.send('No role specified') //when no role is specified or pinged
		await member.roles.add(role) // adding the role to the user
        message.channel.send(`${member.user.username} has been verified, welcome`).then(msg => setTimeout(() => msg.delete(), 5000));
		
		if (member) {
			const userMessages = (await messages).filter(
			(m) => m.author.id == member.id
			);
			await message.channel.bulkDelete(userMessages);
			message.channel.send(
			`${member}'s messages have been deleted and will be verified shortly`
			).then(msg => setTimeout(() => msg.delete(), 5000));
		} else {
			if (!args[0])
				return message.channel.send(
			'pls send a number'
			).then(msg => setTimeout(() => msg.delete(), 5000));
		    if (isNaN(args[0]))
				return message.channel.send(
			'only numbers u cotton picker'
			).then(msg => setTimeout(() => msg.delete(), 5000));
		    if (parseInt(args[0]) > 99)
				return message.channel.send(
			'i cant delete more then 100 msgs u dumbass'
			).then(msg => setTimeout(() => msg.delete(), 5000));
        await message.channel
		    .bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err));
		message.channel.send(`Deleted` + args[0] + "messages.").then(msg => setTimeout(() => msg.delete(), 5000));
		 if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
		}
	},
};
