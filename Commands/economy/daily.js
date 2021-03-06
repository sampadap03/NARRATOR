const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');
const db = require('quick.db');

module.exports = {
    name: "daily",
    description: "claim your daily coins",
    run: async (bot, message, args) => {
        let timeout = 84600000 // 23 hours and 30 minutes
        let amount = 10
        let daily = await db.get(`daily_${message.author.id}_${message.guild.id}`);
        let coins = await db.get(`coins_${message.author.id}_${message.guild.id}`)
        let newCoins = (coins + amount)

        if (daily && (timeout - (Date.now() - daily) > 0)) {
            let time = ms(timeout - (Date.now() - daily));
            message.channel.send(`You've already collected your daily coins, come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)

        } else {
            let embed = new MessageEmbed()
            .setTitle('**Daily Coins**')
            .setDescription(`You had: ${coins ? coins : 0} <:gold:737268058996998215>\n You now have ${newCoins} <:gold:737268058996998215>`)
            message.channel.send(embed)

            db.add(`coins_${message.author.id}_${message.guild.id}`, amount)
            db.set(`daily_${message.author.id}_${message.guild.id}`, Date.now())
        }
    }
}



module.exports.config = {
    name: "daily",
    description: "Claim your 10 daily coins.",
    usage: "=daily",
    aliases: []
}
