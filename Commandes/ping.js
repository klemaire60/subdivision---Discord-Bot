const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "affiche le ping du bot",
    permission: "Aucune",
    dm: true,
    category: "informations",
    
    async run(bot, message, args) {
        try{
            await message.reply(`Ping du bot : \`${bot.ws.ping} ms\`` /*Ping de l'API :\`${}\`*/)
        } catch (err) {
            console.log(err)
            return message.channel.send("Une erreur s'est produite lors de l'exécution de cette commande")
        }
    }   
}