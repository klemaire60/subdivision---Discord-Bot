const Discord = require("discord.js")
const ms = require("ms")


module.exports = {

    name: "unmute",
    description: "Unmute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "modération",
    options:[
        {
            type: "user",
            name: "membre",
            description: "Membre à unmute",
            required: true,
            autocomplete: true,
        },  {
            type: "string",
            name: "raison",
            description: "La raison du unmute",
            required: false,
            autocomplete: false,
        }
    ],
      
    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Cette personne n'est pas sur ce serveur !")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(!member.moderatable) return message.reply("Je ne peut pas unmute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas unmute ce membre")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute !")

        try{ await user.send(`vous avez été unmute sur le serveur ${message.guild.name} par ${message.user} pour la raison : \`${reason}\``) } catch(err){}
    
        await message.reply(`${message.user} à unmute ${user} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)
    }

}