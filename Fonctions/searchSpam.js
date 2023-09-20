const Discord = require('discord.js')
const User = new Map()

module.exports = async message => {

    if(message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) return;

    if(User.get(message.author.id)) {

        const data = User.get(message.author.id)
        let difference = message.createdTimeStamp - data.lastMessage.createdTimeStamp;
        let count = data.msgCount;

        if(difference > 3000) {

            clearTimeout(data.timer)
            data.msgCount = 1
            data.lastMessage = message

            data.timer = setTimeout(() => {
                User.delete(message.author.id)
            }, 10000)

            User.set(message.author.id, data)

        } else {

            count++;

            if(count > 5) {

                await message.Channel.send(`Attention au spam ${message.author}`)
                await message.member.timeout(60000, "Spam")

                const messages = [...(await message.channel.messages.fetch({before: message.id})).filter(m => m.author.id === message.author.id).values().slice(0, 5)]
                await message.channel.bulkDelete(messages)

            } else {

                data.msgCount = count;
                User.set(message.author.id, data)
            }
        }

    } else {

        let FN = setTimeout(() => {
            User.delete(message.author.id)

        }, 10000)

        User.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: FN
        })
    }
}