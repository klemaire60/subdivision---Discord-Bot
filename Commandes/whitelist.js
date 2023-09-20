const Discord = require("discord.js")

    module.exports = {
    name: "whitelist",
    description: "Gérer la Whitelist",
    permission: Discord.PermissionFlagsBits.Administrator,
    DM: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "action",
            description: "add/remove",
            required: true,
            autocomplete: true,
        },{
            type: "user",
            name: "membre",
            description: "Le membre à ajouter ou à supprimer de la WL",
            required: false,
            autocomplete: true,
        },{
            type: "role",
            name: "role",
            description: "Le rôle à ajouter ou à supprimer de la WL",
            required: false,
            autocomplete: true,
        },
    ],

    async run(bot, message, args, db) {
        let user = args.getUser("membre")
        let action = args.getString("action")
        let role = args.getRole("role")

        if(!user && !role) return message.reply("Veuillez indiquer un utilisateur ou un rôle")
        if(action !== "add" && action !== "remove") return message.reply("Veuillez indiquer Add ou Remove")
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de rôle trouvé")

        if(action === "add") {     

            db.query(`SELECT * FROM server WHERE guild = ${message.guildId}`, async(err, req) => {
                
                let wl = req[0].whitelist.split(" ")

                if(user) {
                    if(wl.includes(user.id)) {
                        message.reply("Cet utilisateur est déjà dans la whitelist")
                    } else {

                        await wl.push(user.id)

                        await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                        await message.reply(`${user} à été ajouté à la Whitelist`)
                    }
                }

                if(role) {
                    if(!user) {

                        if(wl.includes(role.id)) {
                            message.reply("Ce rôle est déjà dans la whitelist")
                        } else {
                        
                            await wl.push(role.id)
                            
                            await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                            await message.reply(`le rôle \`${role.name}\` à été ajouté à la Whitelist`)
                        }

                    } else if(user) {

                        if(wl.includes(role.id)) {
                            message.channel.send("Ce rôle est déjà dans la whitelist")
                        } else { 

                            await wl.push(role.id)
                            
                            await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                            await message.channel.send(`le rôle \`${role.name}\` à été ajouté à la Whitelist`)
                        }
                    }
                }
            })      
        }

        if(action === "remove") {

            db.query(`SELECT * FROM server WHERE guild = ${message.guildId}`, async(err, req) => {
                
                if(!user && role) {
                        
                    let wl = req[0].whitelist.split(" ")
                        
                    if(!wl.includes(role.id)) return message.reply("Ce rôle n'est pas dans la whitelist")
                        
                    let number = wl.indexOf(role.id)
                    wl.splice(number, 1)
                        
                    await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                    await message.reply(`le rôle \`${role.name}\` à bien été retiré de la whitelist`)
                        
                } else {
                        
                    let wl = req[0].whitelist.split(" ")
                        
                    if(!wl.includes(user.id)) {

                        message.reply("Cet utilisateur n'est pas dans la whitelist")
                    } else {
        
                        let user_number = wl.indexOf(user.id)
                        wl.splice(user_number, 1)
                            
                        await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                        await message.reply(`${user} à bien été retiré de la whitelist`)
                    }

                    if(role){
                        if(!wl.includes(role.id)) {
                            return message.channel.send("Ce rôle n'est pas dans la whitelist")
                        } else {
                                
                            let role_number = wl.indexOf(role.id)
                            wl.splice(role_number, 1)
                                
                            await db.query(`UPDATE server SET whitelist = '${wl.filter(e => e !== " ").join(" ")}' WHERE guild = ${message.guild.id}`)
                            await message.channel.send(`le rôle \`${role.name}\` à bien été retiré de la whitelist`)
                        }
                    }
                }
            })
        }
    }
}