﻿const Discord = require('discord.js');

module.exports={
	name: "joingame",
	description: "you can add a role with this thing",
	catgory: "misc",
	run:async(bot,message,args)=>{
	if(message.member.roles.cache.has("@everyone")) {
		let member = message.member;
	}
	if(message.guild.id === "728065941459435573") return message.channel.send ("You can only use that command in the game Server!")
    member.roles.add(728078042500431952).catch(console.error)
    }
}