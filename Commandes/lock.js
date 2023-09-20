const Discord = require("discord.js")

module.exports= {

    name: "lock",
    description: "Lock un salon",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    DM: false,
    category: "modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon à lock",
            required: true,
            autocomplete: true,
        }, {
            type: "role",
            name: "rôle",
            description: "Le rôle à lock",
            required: false,
            autocomplete: true,
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("pas de salon")
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Envoyez un salon textuel")

        let role = args.getRole("rôle")
        console.log(role)
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de rôle")
        if(!role) role = message.guild.roles.everyone

        if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes("SendMessages")) return message.reply(`Le rôle \`${role.name}\` est déjà lock dans le salon ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false})
        else await channel.permissionOverwrites.create(role.id, {SendMessages: false})
        
        await message.reply(`Le rôle \`${role.name}\` à bien été lock dans le salon ${channel}`)
    }
}