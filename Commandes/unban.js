const Discord = require("discord.js")

module.exports= {

    name: "unban",
    description: "Unban un utilisateur",
    permission: Discord.PermissionFlagsBits.BanMembers,
    DM: false,
    category: "modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur à unban",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unban",
            required: false,
            autocomplete: false, 
        }
    ],

    async run(bot, message, args) {

        try{

            let user = args.getUser("utilisateur")
            if(!user) return message.reply("Pas de membre")

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison fournie.";

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas banni")

            try{await user.send(`Tu as été unban du serveur ${mesage.guild.name} par ${message.user} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} à unban ${user} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch(err){

            return message.reply("Pas d'utilisateur")
        }
    }
}