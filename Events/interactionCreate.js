const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help"){
            
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name : cmd.name, value : cmd.name})) : choices.map(choice => ({name: choice, value: choice})))
        }

        if(interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid" || interaction.commandName === "setantispam"){
            
            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name : c, value : c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "setstatut"){
            
            let choices = ["Watching", "Listening", "Playing", , "Competing"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name : c, value : c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "roles" || interaction.commandName === "whitelist"){
            
            let choices = ["add", "remove"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name : c, value : c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    if(interaction.isButton()) {

        if(interaction.customId === "ticket") {
            
            
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText,})
                try {await channel.setParent(interaction.channel.parent.id)} catch (err) {}

                await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    ViewChannel: false
                })
                await channel.permissionOverwrites.create(interaction.user, {
                    ViewChannel: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    SendMessages: true,
                    ReadMessageHistory: true,
                })
                await channel.permissionOverwrites.create("1066281008984498206", {
                    ViewChannel: true,
                    EmbedLinks: true,
                    AttachFiles: true,
                    SendMessages: true,
                    ReadMessageHistory: true,
                })       


            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket à bien été créer : ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Ticket de ${interaction.user.username}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription("Fermer le ticket")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🔖"))

            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "close") {

            let user = bot.users.cache.get(interaction.channel.topic)
            try {await user.send("Votre ticket à été fermé")} catch (err) {}

            await interaction.channel.delete()
        }
    } 
}