const Discord = require("discord.js")

module.exports= {

    name: "setstatut",
    description: "Change le statut du bot",
    permission: Discord.PermissionFlagsBits.Administrator,
    DM: false,
    category: "Admnistration",
    options: [
        {
            type: "string",
            name: "activité",
            description: "Activité du bot",
            required: true,
            autocomplete: true,
        }, {
            type: "string",
            name: "statut",
            description: "Statut du bot",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "lien",
            description: "Lien pour stream",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        let activity = args.getString('activité')
        if(activity !== "Playing"  && activity !== "Competing" && activity !== "Listening" && activity !== "Watching") return message.reply("Merci de suivre l'autocomplete et définir une activité")

        let statut = args.getString("statut")

        await bot.user.setActivity(statut, {type: Discord.ActivityType[activity]})
        await message.reply("Statut mis à jour !")
    }
}