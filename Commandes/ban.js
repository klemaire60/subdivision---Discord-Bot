const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    DM: false,
    category: "modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true,
            autocomplete: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, interaction) {

        try {
            if(interaction && message.isCommand()) {

                let user = await bot.users.fetch(args._hoistedOptions[0].value)
                if(!user) return message.reply("Pas de membre à bannir !")
                let member = message.guild.members.cache.get(user.id)

                let reason = args.getString("raison");
                if(!reason) reason = "Aucune raison fournie.";

                
                if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous bannir vous même !")
                if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !")
                if(member && !member.bannable) return message.reply("Je ne peut pas bannir ce membre")
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas bannir ce membre")
                if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni")
                
                try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user} pour la raison: \`${reason}\``)} catch(err) {}
                
                await message.reply(`${message.user} à banni ${user} pour la raison : \`${reason}\``)
                
                await message.guild.bans.create(user.id, {reason: reason})

            }

            if (message.content.toLowerCase().startsWith("!ban")) {

                let user = message.mentions.members.first()
                if(!isNaN(args[1])) return message.reply("Veuillez ping le membre à bannir ou utiliser les SlashCommands ||Astuce: pour ping avec un ID <@ID>||")  
                if(!user) return message.reply("Aucun membre à bannir !")
                let member = message.guild.members.cache.get(user.id)

                let reason = args[2]
                if(!reason) reason = "Aucune raison fournie."

                if(message.author.id === user.id) return message.reply("Vous ne pouvez pas vous bannir vous même !")
                if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire du serveur !")
                if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre")
                if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas bannir ce membre")
                if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni")
                
                try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user} pour la raison: \`${reason}\``)} catch(err) {}
                
                await message.reply(`${message.author} à banni ${user} pour la raison : \`${reason}\``)
                
                await message.guild.bans.create(user.id, {reason: reason})

            }

        } catch (err) {
            
            console.log(err)
            message.channel.send("Une erreur est survenue !")
        }
    }
}

