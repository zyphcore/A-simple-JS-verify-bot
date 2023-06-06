const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'blacklist',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
		const member = message.mentions.members.first();
		const messages = message.channel.messages.fetch();
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('Member is not found.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'blacklisted')
        if(!role) {
            try {
                message.channel.send('blacklisted role is not found, attempting to create blacklisted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'blacklisted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('blacklisted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'blacklisted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been blacklisted.`).then(msg => setTimeout(() => msg.delete(), 5000));
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now blacklisted.`).then(msg => setTimeout(() => msg.delete(), 5000));
				if (member) {
			const userMessages = (await messages).filter(
			(m) => m.author.id == member.id
			);
			await message.channel.bulkDelete(userMessages);
			message.channel.send(
			`${member}'s messages have been deleted and wont be able to send new ones xd`
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
    }
}