const Discord = require("discord.js")

module.exports= {

    name: "setantispam",
    description: "Paramètre l'antispam",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    DM: false,
    category: "Admnistration",
    options: [
        {
            type: "string",
            name: "état",
            description: "état de l'antispam (on/off)",
            required: true,
            autocomplete: true,
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "on" && etat!== "off") return message.reply("Veuillez spécifier l'état de l'antispam (on/off)")

        if(etat === "off") {

            db.query(`UPDATE server SET antispam = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("l'antispam à été désactivé")

        } else {

            db.query(`UPDATE server SET antispam = 'true' WHERE guild = '${message.guildId}'`)
            await message.reply(`L'antispam est activé`)
        }
    }
}