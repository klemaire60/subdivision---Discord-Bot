const Discord = require("discord.js")

module.exports= {

    name: "setantiraid",
    description: "Paramètre l'antiraid (Empêche les nouveaux membres)",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    DM: false,
    category: "Admnistration",
    options: [
        {
            type: "string",
            name: "état",
            description: "état de l'antiraid (on/off)",
            required: true,
            autocomplete: true,
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "on" && etat!== "off") return message.reply("Veuillez spécifier l'état de l'antiraid (on/off)")

        if(etat === "off") {

            db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("l'antiraid à été désactivé")

        } else {

            db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)
            await message.reply(`L'antiraid est activé`)
        }
    }
}