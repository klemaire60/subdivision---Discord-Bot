const Discord = require("discord.js")
const { PermissionsBitField, Buttonstyle, ActionRowBuilder, Embedbuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    
    name: "reactionrole",
    description: "Créer un role reaction",
    permission: Discord.PermissionFlagsBits.Administrator,
    DM: false,
    category: "Administration",
    options: [
        {
            type: "role",
            name: "role1",
            description: "Le premier rôle que vous voulez configurer",
            required: true,
            autocomplete: true,
        }, {
            type: "role",
            name: "role2",
            description: "Le deuxième rôle que vous voulez configurer",
            required: true,
            autocomplete: true,
        }, {
            type: "role",
            name: "role3",
            description: "Le troisième rôle que vous voulez configurer",
            required: true,
            autocomplete: true,
        },
    ],

    async run(bot, message,args) {

        let role1 = args.getRole("role1")
        let role2 = args.getRole(`role2`);
        let role3 = args.getRole(`role3`);

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('bouton1')
            .setLabel(`${role1.name}`)
            .setStyle(Discord.ButtonStyle.Secondary),
            
            new ButtonBuilder()
            .setCustomId('bouton2')
            .setLabel(`${role2.name}`)
            .setStyle(Discord.ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('bouton3')
            .setLabel(`${role3.name}`)
         
           .setStyle(Discord.ButtonStyle.Secondary),
        )

        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Reaction role")
        .setDescription(`Cliquez sur les boutons ci-dessous pour avoir les rôles spécifiés (${role1.name}, ${role2.name}, ${role3.name})`)

        await message.reply({ embeds: [Embed], components: [button] })

        const collector = await message.channel.createMessageComponentCollector();

        collector.on('collect', async (i) => {

            const member = i.member;

            if(i.guild.members.me.roles.highest.position < role1.position) {
                i.update({ content: "Mon rôle est plus bas que celui que j'essaye d'attribuer, je ne peut donc pas le donner", ephemeral: true});
                return;
            } else if(i.guild.members.me.roles.highest.position < role2.position) {
                i.update({ content: "Mon rôle est plus bas que celui que j'essaye d'attribuer, je ne peut donc pas le donner", ephemeral: true});
                return;
            } else if(i.guild.members.me.roles.highest.position < role3.position) {
                i.update({ content: "Mon rôle est plus bas que celui que j'essaye d'attribuer, je ne peut donc pas le donner", ephemeral: true});
                return;
            }

            if(i.customId === "bouton1") {

                member.roles.add(role1);
                i.reply({ content: `Tu as obtenu le rôle ${role1.name}`, ephemeral: true })

            }
            
            if(i.customId === "bouton2") {

                member.roles.add(role2);
                i.reply({ content: `Tu as obtenu le rôle ${role2.name}`, ephemeral: true })

            }
            
            if(i.customId === "bouton3") {

                member.roles.add(role3);
                i.reply({ content: `Tu as obtenu le rôle ${role3.name}`, ephemeral: true })

            } 
        })
    }
}