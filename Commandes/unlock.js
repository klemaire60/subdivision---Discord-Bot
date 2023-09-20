const Discord = require("discord.js")

module.exports= {

    name: "unlock",
    description: "Unlock un salon",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    DM: false,
    category: "modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon à unlock",
            required: true,
            autocomplete: true,
        }, {
            type: "role",
            name: "rôle",
            description: "Le rôle à unlock",
            required: false,
            autocomplete: true,
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("pas de salon")
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Envoyez un salon textuel")

        let role = args.getRole("rôle")
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de rôle")
        if(!role) role = message.guild.roles.everyone

        if(channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes("SendMessages")) return message.reply(`Le rôle \`${role.name}\` est déjà unlock dans le salon ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: true})
        else await channel.permissionOverwrites.create(role.id, {SendMessages: true})
        
        await message.reply(`Le rôle \`${role.name}\` à bien été unlock dans le salon ${channel}`)
    }
}