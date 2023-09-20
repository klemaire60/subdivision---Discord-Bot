const Discord = require("discord.js")

module.exports= {

    name: "kick",
    description: "kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    DM: false,
    category: "modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas d'utilisateur à kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Cette personne n'est pas sur ce serveur !")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(message.user.id === user.id) return message.reply("Essai pas de te kick !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le propriétaire du serveur !")
        if(member && !member.kickable) return message.reply("Je ne peut pas kick ce membre")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas kick ce membre")

        try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user} pour la raison: \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} à kick ${user} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}