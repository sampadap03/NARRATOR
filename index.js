const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    dsableEveryone: true
})
const config = require('./config.json')
const prefix = config.prefix;
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
bot.prefix = "=";
["command","event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.login(process.env.token)