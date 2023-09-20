const Discord = require("discord.js")
const ms = require("ms")


module.exports = {

    name: "mute",
    description: "Mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "modération",
    options:[
        {
            type: "user",
            name: "membre",
            description: "Membre à mute",
            required: true,
            autocomplete: true,
        }, {
            type: "string",
            name: "temps",
            description: "Temps du mute",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: false,
            autocomplete: false,
        }
    ],
      
    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre à mute !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Cette personne n'est pas sur ce serveur !")

        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps défini !")
        if(isNaN(ms(time))) return message.reply("Pas le bon format de temps !")
        if(ms(time) > 2419200000) return message.reply("le mute ne peut pas durer plus de 28 jours !")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(message.user.id === user.id) return message.reply("tu ne peut pas te mute toi même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("tu ne peut pas mute le propriétaire !")
        if(!member.moderatable) return message.reply("Je ne peut pas mute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas mute ce membre")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")
        
        try {await user.send(`Tu as été mute sur ${message.guild.name} par ${message.user} pendant ${time} pour la raison: \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} à mute ${user} pendant ${time} pour la raison : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}