const express = require("express");
const app = express()

  app.listen(3000, () => {
    console.log("Project is running!");
  })

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const fs = require("fs");
const prefix = ("-")
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(" ")
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)
    if(!command) return message.channel.send({content: "That is not a command"})
    command.run(client, message, args)
  }
})

client.login(process.env.token)