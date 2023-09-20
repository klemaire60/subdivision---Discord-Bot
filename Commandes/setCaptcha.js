const Discord = require("discord.js")

module.exports= {

    name: "setcaptcha",
    description: "Paramètre le captcha",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    DM: false,
    category: "Admnistration",
    options: [
        {
            type: "string",
            name: "état",
            description: "état du captcha (on/off)",
            required: true,
            autocomplete: true,
        }, {
            type: "channel",
            name: "salon",
            description: "Salon du captcha (nécessaire si l'état est on)",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "on" && etat!== "off") return message.reply("Veuillez spécifier l'état du captcha (on/off)")

        if(etat === "off") {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("Le captcha à été désactivé")

        } else {

            let channel = args.getChannel("salon")
            if(!channel) return message.reply("Veuillez spécifier un salon pour activer le captcha")
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply("Le salon n'existe pas ici")

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
            await message.reply(`Le captcha est activé dans le salon: ${channel}`)
        }
    }
}