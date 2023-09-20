const Discord = require("discord.js")

module.exports= {

    name: "warn",
    description: "Met un avertissement à un membre",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    DM: false,
    category: "modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à avertir",
            required: true,
            autocomplete: true,
        },  {
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Cette personne n'est pas sur ce serveur")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie"

        if(message.user.id === user.id) return message.reply("Tu ne peut pas te warn toi même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas warn le propriétaire du serveur !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas warn ce membre")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Je ne peut pas warn ce membre")

        try {await user.send(`${message.user} vous à warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} à warn ${user} pour la raison : \`${reason}\``)

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warn ,reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}