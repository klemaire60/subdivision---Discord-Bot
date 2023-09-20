const Discord = require("discord.js")

module.exports= {

    name: "clear",
    description: "Supprime les messages d'un salon",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    DM: false,
    category: "modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer (max.:100)",
            required: true,
            autocomplete: false,
        },  {
            type: "channel",
            name: "salon",
            description: "Le salon à clear",
            required: false,
            autocomplete: true,
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("il faut un nombre compris entre `1` et `100`")


        try{
            
            let messages = await channel.bulkDelete(number)

            await message.reply({content: `J'ai supprimé \`${messages.size}\` message(s) dans le salon ${channel}`, ephemeral: true})

        } catch (err) {
            

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.channel.send("Je n'ai pu supprimer aucuns messages car ils datent tous de plus de 14 jours")
            await channel.bulkDelete(messages)

            await message.reply({content: `J'ai pu supprimé \`${messages.length}\` message(s) car les autres dataient plus de 14 jours`, ephemeral: true})
        }
    }
}