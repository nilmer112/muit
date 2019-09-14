//--Init-----------------------------

const Discord = require('discord.js');
const moment = require('moment');
const Config = require('./config.json');
const mysql = require('mysql');
const util = require('util');
const bot = new Discord.Client();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(Config.google_api_key);
const queue = new Map();
const { Util } = require("discord.js");
const os = require('os')
const cpuStat = require("cpu-stat");
const cows = require('cows');
const rn = require('random-number');
const snekfetch = require('snekfetch');
const urban = require("urban");
var fs = require("fs");
//-----------------------------------

//--Variables------------------------

var prefix 		= Config.prefix;
var token 		= Config.bot_token;
var color 		= "#e54d06";
var bot_image 	= "https://i.imgur.com/THEJYAZ.png";
var ownerID		= "349235268890656780";
var ownerID2	= "349235268890656780";

//-----------------------------------

//--Dume-----------------------------


//--Bot-Login------------------------

bot.login(token);
bot.on('ready',async () => {
	console.log(`${bot.user.username} is online!`)
	bot.user.setActivity('Prefix "n?" type n?help',{type: "playing"});
	bot.user.setStatus('dnd');
});
//--Commands-------------------------

bot.on('message', async message => {

	//--MySQL-Connection-----------------

	const con = mysql.createConnection({
	  host: 	Config.mysql_host,
	  user: 	Config.mysql_user,
	  password: Config.mysql_pass,
	  database: Config.mysql_dbname
	});

	//-----------------------------------

	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;

	const args = message.content.split(' ');
	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length);

	switch(command){
		case 'ping': {
			message.channel.send('Pong! ' + Math.floor(Math.round(bot.ping)) + ' ms');
			return;
		}
		case 'info': {
			const infoEmbed = new Discord.RichEmbed()
			.setColor(color)
			.setAuthor('NiLMERB0t', bot_image, 'https://crysgfx.com/')
			.setDescription('NiLMER Personal bot')
			.setThumbnail(bot_image)
			.addField('Bot OWNER/Editor', 'NiLMER')
			.addField('Special Thanks', 'NiLMER', true)
			.setTimestamp()
			.setFooter(`Requested by ${message.member.user.tag}`,message.author.avatarURL);
			message.channel.send(infoEmbed);
			return;
		}
		case 'avatar': {
			let user = message.mentions.users.first() || message.author;
			let avatarEmbed = new Discord.RichEmbed()
			.setImage(user.avatarURL)
			.setColor(color)
			.setTimestamp()
			.setFooter(`Requested by ${message.member.user.tag}`,message.author.avatarURL);
			message.channel.send(avatarEmbed);
			return;
		}
		case 'invite': {
		 let user = message.mentions.users.first() || message.author;
			var embed = new Discord.RichEmbed()
			.setAuthor('Click here for invite!', bot_image, 'https://discordapp.com/oauth2/authorize?client_id=622151975102054401&scope=bot&permissions=2146958591')
			.setColor(color)
			.setTitle(`Invite NiLMERB0t to your discord server!`)

			message.channel.send({embed})
			return;
		}
		case 'help': {
			const infoEmbed = new Discord.RichEmbed()
			.setColor(color)
			.setAuthor('NiLMERB0t', bot_image, 'https://crysgfx.com/')
			.setDescription('Help commands!')
			.setThumbnail(bot_image)
			.addField('**__▸BASIC― COMMANDS!__**', '**help -           see all bot commands and info\nuserinfo -       see informations about an user\nserverinfo -     see informations about the server\ninfo -           see informations about the bot\nping -           see bot ping information\navatar -         show your own avatar or selected users avatar\ninvite -         invite bot to your server**')
			.addField('**__▸MODERATION― COMMANDS!__**', '**kick -           kick someone from the server\nban  -           ban someone from the server\nmute -           mute someone on the server\nunmute -         unmute someone who is mutted\nunban   -        unban someone who is banned\ndm     -         send a dm message to someone\nsay   -          speak in the name of the bot\npoll    -        create a poll and let people vote\nautorole  -      learn how to make auto role\nclear   -        clear a specific number of texts\nwarnlog   -      set warnlog channel\nwarn     -       warn a specific person\nsetwarns   -     set custom number of warns to someone**', true)
			.setTimestamp()
			.setFooter(`Requested by ${message.member.user.tag}`,message.author.avatarURL);
			message.channel.send(infoEmbed);
			return;
}
		case 'choice': {
			if(!args[1] || !args[2])return message.channel.send('```Syntax: !choice [choice1] [choice2]```');
			var choice1 = args[1];
			var choice2 = args[2];
			var pullResult = Math.floor(Math.random() * 2);
			if(pullResult == 0){
				message.channel.send(`**Eu aleg ${choice1} dete-n pula mea.:middle_finger::skin-tone-1: `);
				return;
			}else {
				message.channel.send(`**Eu aleg ${choice2} dete-n pula mea.:middle_finger::skin-tone-1:`);
				return;
			}
		}
		case 'clear': {
			if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send('Nu ai tu asa permisiune :fire:!');
			if(!args[1])return message.channel.send('```Foloseste: !clear [numar de mesaje]```');
			let messagecount = parseInt(args[1]);
			message.channel.fetchMessages({ limit: args[1] })
			  .then(messages => message.channel.bulkDelete(messages));
			message.channel.send(`🗑️ | Am sters **${args[1]}** mesaje. :fire:`);
			return;
		}
		case 'userinfo': {
			let user = message.mentions.users.first() || message.author;
		    const joinDiscord = moment(user.createdAt).format('llll');
		    const joinServer = moment(user.joinedAt).format('llll');
		    let userinfoEmbed = new Discord.RichEmbed()
		        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
		        .setDescription(`${user}`)
		        .setColor(color)
		        .setThumbnail(`${user.displayAvatarURL}`)
		        .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
		        .addField('Status:', user.presence.status)
		        .setFooter(`ID: ${user.id}`)
		        .setTimestamp();
		    message.channel.send(userinfoEmbed);
		    return;
		}
		case 'serverinfo': {
			function checkDays(date) {
		        let now = new Date();
		        let diff = now.getTime() - date.getTime();
		        let days = Math.floor(diff / 86400000);
		        return days + (days == 1 ? " day" : " days") + " ago";
		    };
		    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
		    let region = {
		        "brazil": ":flag_br: Brazil",
		        "eu-central": ":flag_eu: Central Europe",
		        "singapore": ":flag_sg: Singapore",
		        "us-central": ":flag_us: U.S. Central",
		        "sydney": ":flag_au: Sydney",
		        "us-east": ":flag_us: U.S. East",
		        "us-south": ":flag_us: U.S. South",
		        "us-west": ":flag_us: U.S. West",
		        "eu-west": ":flag_eu: Western Europe",
		        "vip-us-east": ":flag_us: VIP U.S. East",
		        "london": ":flag_gb: London",
		        "amsterdam": ":flag_nl: Amsterdam",
		        "hongkong": ":flag_hk: Hong Kong",
		        "russia": ":flag_ru: Russia",
		        "southafrica": ":flag_za:  South Africa"
		    };
		    const serverinfoEmbed = new Discord.RichEmbed()
		    	.setColor(color)
		        .setAuthor(message.guild.name, message.guild.iconURL)
		        .addField("Name", message.guild.name, true)
		        .addField("ID", message.guild.id, true)
		        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
		        .addField("Region", region[message.guild.region], true)
		        .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
		        .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
		        .addField("Channels", message.guild.channels.size, true)
		        .addField("Roles", message.guild.roles.size, true)
		        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
		        .setThumbnail(message.guild.iconURL)
		    message.channel.send(serverinfoEmbed);
		    return;
		}
		case 'iq': {
			var user = message.mentions.users.first() || message.author;
			var iq = Math.floor(Math.random() * 200) + 1;
			message.channel.send(`${user}, your IQ is: **${iq}**`);
			return;
		}
		case 'dmall': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return message.channel.send('Doar developerul meu are access :) !');
			let text = args.slice(1).join(' ');
			if(!text)return message.channel.send('```Syntax: !dmall [text]```');
			message.guild.members.forEach(member => {
				if(!member.user.bot){
					member.send(text);
				}
			});
			return;
		}
		case 'skemanilmer': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return message.channel.send('Doar developerul meu are access :) !');
			let text = args.slice(1).join(' ');
			if(!text)return message.channel.send('```Syntax: !skemanilmer [text]```');
			message.guild.members.forEach(member => {
				if(!member.user.bot){
					message.channel.send(`${member}, ${text}`);
				}
			});
			return;
		}
		case 'kickall': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return message.channel.send('Doar developerul meu are access :) !');
			let text = args.slice(1).join(' ');
			if(!text)return message.channel.send('```Syntax: !kickall [reason]```');
			message.guild.members.forEach(member => {
				if(!member.user.bot){
					if (member.id == 349235268890656780) return message.channel.send("Nu îmi pot da afara developer-ul!");
					message.guild.member(member).kick(text);
					message.channel.send(`${member}, ${text}`);
				}
			});
			return;
		}
		case 'dm': {

            var dmSyntax = new Discord.RichEmbed()
            .setTitle('```Syntax: !dm [@user] [message]```')
            .setColor(color);

            let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let text = args.slice(2).join(' ');
            if(!text)return message.channel.send(dmSyntax);
            if(!user)return message.channel.send(dmSyntax);
            user.send(text);
            message.delete().catch(e=>{}); 
            return;
        }
		case 'exec': {
			if(message.author.id !== ownerID && message.author.id !== ownerID2)return message.channel.send('You do not have permission!');
			let text = args.slice(1).join(' ');
			if(!text)return message.channel.send('```Syntax: !exec [command]```');
			console.log(text);
			return;
		}
		case 'kill': {
			let killed = message.mentions.members.first();
			if(!killed) {

				let killEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setDescription(`${message.author} decied to kill themself 💔 REST IN PEACE`)

				message.channel.send(killEmbed)

			} else {

				let killEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setDescription(`${killed} was killed by ${message.author} 💔 REST IN PEACE`)

				message.channel.send(killEmbed)
			}
		}
		case 'cow': {
			const options = {
		        min: 0,
		        max: cows().length - 1,
		        integer: true
		    };
		    const random = rn(options);
		    message.channel.send(cows()[random], { code: ''});
		    return;
		}
		case 'pepe': {
			let pepe1 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556352915505165.png?v=1");

		    let pepe2 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556326482739230.png?v=1");

		    let pepe3 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556486235389973.png?v=1");

		    let pepe4 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556308929576960.png?v=1");

		    let pepe5 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556295218659329.png?v=1");

		    let pepe6 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556467021545473.png?v=1");

		    let pepe7 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556448507625474.png?v=1");

		    let pepe8 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556377754042378.png?v=1");

		    let pepe9 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556281767526405.png?v=1");

		    let pepe10 = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage("https://cdn.discordapp.com/emojis/428556266366042112.png?v=1");

		    let pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10]

		    let dapepe = Math.floor((Math.random() * pepes.length));

		    message.channel.send(pepes[dapepe]);
		    return;
		}
		case 'dog': {
			const { body } = await snekfetch.get('https://random.dog/woof.json');
		    const dogEmbed = new Discord.RichEmbed()
		    .setColor(color)
		    .setImage(body.url);

		    message.channel.send(dogEmbed);
		    return;
		}
		case 'icon': {
			let msg = await message.channel.send("Generating icon...");

			if(!message.guild.iconURL) return msg.edit("No icon found!");

			let iconembed = new Discord.RichEmbed()
			.setColor(color)
			.setFooter("Searched by " + message.author.tag)
			.setImage(message.guild.iconURL)
			.setTitle("Icon")
			.setDescription("[Icon URL link]("+message.guild.iconURL+")")

			message.channel.send(iconembed)
			    
		    msg.delete();
		    return;
		}
		case 'eval': {
			if(message.author.id !== ownerID && message.author.id !== ownerID2) return;

		    const command = message.content.split(' ').slice(1).join(' ');
		    message.channel.send(
			`\`\`\`js
			${eval(command)}
			\`\`\``);
		    return;
		}
		case 'say': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return;
			let text = args.slice(1).join(' ');
			if(!text)return message.channel.send('```Syntax: !say [text]```');
			message.delete().catch(e=>{}); 
			message.channel.send(text);
			return;
		}
		case 'urban': {
			if(args.length < 1) return message.reply("Please enter something!");
		    let text = args.slice(1).join(" "); 

		    urban(text).first(json => {
		        if(!json) return message.reply("No results found!")

		        let urbEmbed = new Discord.RichEmbed()
		        .setColor(color)
		        .setTitle(json.word)
		        .setDescription(json.definition)
		        .addField("Upvotes", json.thumbs_up, true)
		        .addField("Downvotes", json.thumbs_down, true)
		        .setFooter(`Written by: ${json.author}`);

		        message.channel.send(urbEmbed)
		    });
		    return;
		}
		case 'rate': {
			let user = message.mentions.members.first() || message.author;
			if(!user) return message.channel.send("Tag someone to rate them!");

			let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

			let result = Math.floor((Math.random() * rates.length));

			if(user.id === message.author.id) {
			  return message.channel.send(`**${message.author.username}**, I'd give you ${result}/10 <a:ayy:578590277162500117>`);
			} else return message.channel.send(`I'd give **__${user.user.username}__** ${result}/10 <a:ayy:578590277162500117>`);
		}
		case 'addalt': {
			if(message.author.id == "349235268890656780" || message.author.id == "349235268890656780"){
				var type = args[1];
				var email = args.slice(2).join(" ");
				if(!type)return message.channel.send('```Syntax: !addalt [type] [email:password]\n \nTypes: 1 = Spotify, 2 = Fortnite, 3 = Minecraft, 4 = NordVPN, 5 = Netflix```');
				if(!type)return message.channel.send('```Syntax: !addalt [type] [email:password]\n \nTypes: 1 = Spotify, 2 = Fortnite, 3 = Minecraft, 4 = NordVPN, 5 = Netflix```');
				if(!type)return message.channel.send('```Syntax: !addalt [type] [email:password]\n \nTypes: 1 = Spotify, 2 = Fortnite, 3 = Minecraft, 4 = NordVPN, 5 = Netflix```');
				if(type > 5 || type < 1)return message.channel.send('Invalid type!');
				var rand = function() {
				    return Math.random().toString(36).substr(2);
				};
				var token = function() {
				    return rand() + rand();
				};

				con.connect(function(err){
					var insertAlt = util.format("INSERT INTO `discord_alts` (`Email`,`Active`,`TokenID`,`AddedBy`,`Type`,`Adfly`) VALUES ('%s','%d','%s','%s','%d','%s')",email,1,token(),message.author.id,type,token());
					con.query(insertAlt,function(err,result){
						if(err)return console.log(err);
						message.channel.send('Account successfully registered!');
					});
					con.end();
				});
				return;
			}else  return message.channel.send('You do not have access!');
		}
		case 'checkaccounts': {
			if(message.author.id == "349235268890656780" || message.author.id == "349235268890656780"){
				var type = args[1];
				if(!type)return message.channel.send('```Syntax: !checkaccounts [type]\n \nTypes: 1 = Spotify, 2 = Fortnite, 3 = Minecraft, 4 = NordVPN, 5 = Netflix```');
				if(type > 5 || type < 1)return message.channel.send('Invalid type!');
				con.connect(function(err){
					var sql = util.format("SELECT * FROM `discord_alts` WHERE `Active` = 1 AND `Type` ='%d'",type);
					con.query(sql,function(err,result){
						if(type == 1){
							message.channel.send(`Spotify accounts: **${result.length}**`);
							
						}else if(type == 2){
							message.channel.send(`Fortnite accounts: **${result.length}**`);
						

						}else if(type == 3){
							message.channel.send(`Minecraft accounts: **${result.length}**`);
							

						}else if(type == 4){
							message.channel.send(`NordVPN accounts: **${result.length}**`);
							
						}else if(type == 5){
							message.channel.send(`Netflix accounts: **${result.length}**`);
							
						}
					});
					con.end();
				});
				return;
			}else return;
		}
		case 'getalt': {
			var type = args.slice(1).join(" ");
			if(!type)return message.channel.send('```Syntax: !getalt [type]\n \nTypes: 1 = Spotify, 2 = Fortnite, 3 = Minecraft, 4 = NordVPN, 5 = Netflix```');
			if(type > 5 || type < 1)return message.channel.send('Invalid type!');
			con.connect(function(err){
				var sql = util.format("SELECT * FROM `discord_alts` WHERE `Active` = 1 AND `Type` ='%d' LIMIT 1",type);
				con.query(sql,function(err,result){
					if(result.length == 0){
						message.channel.send('There is currently no valid account in the database, wait until an administrator adds new accounts.');
					}else {
						message.author.send(`You must to go on this **__website__**: http://crysgfx.com/ \nand you need to put this code token there:  **${result[0].TokenID}**\n*Sometimes is posible that is not working!`);
						message.reply(' you have got a message about the account!');
					}
					con.end();
				});
			});
			return;
		}
		case 'kick': {
			if (!message.member.hasPermission("KICK_MEMBERS") && message.author.id !== ownerID && message.author.id !== ownerID2) return message.channel.send("Sorry, you don't have permissions to use this!");

			    let member = message.mentions.members.first();
			    if(!member) return message.channel.send('```Syntax: !kick [@user] [reason]```');
			      
			    if(!member.kickable) 
			      return message.channel.send("I cannot kick this user!");

			  	if(member.user.id === ownerID && member.user.id === ownerID) return message.channel.send("I can't kick my owner!")
			    
			    let reason = args.slice(2).join(' ');
			    if(!reason) {
			      res = "No reason given";
			    }
			    else {
			      res = `${reason}`
			    }
			    
			    await member.kick(reason)
			      .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`));

			      let kick = new Discord.RichEmbed()
			      .setColor(color)
			      .setTitle(`Kick | ${member.user.tag}`)
			      .addField("User", member, true)
			      .addField("Moderator", message.author, true)
			      .addField("Reason", res)
			      .setTimestamp()
			      .setFooter(member.id);
				  member.send(`You was kicked by ${message.author.name} from ${message.guild.name}, reason: ${reason}`);

			      var channel = bot.channels.find(channel => channel.name === "bot-logs");
					if(channel){
						channel.send(kick);
					}

			    return;
		}
		case 'ban': {

	        if(!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== ownerID && message.author.id !== ownerID2) return message.channel.send("Sorry you don't have permission to use this!");

	        let member = message.mentions.members.first();
	        if(!member) return message.channel.send('```Syntax: !ban [@user] [reason]```');
	        if(!member.bannable) return message.channel.send("I can't ban this user!")
	        if(member.user.id === ownerID && member.user.id === ownerID) return message.channel.send("I can't ban my owner!")

	        if(member.id === message.author.id) return message.channel.send("You can't ban your self")

	        let reason = args.slice(2).join(" ");

	        if(!reason) {
	            res = "No reason given";
	        } else {
	            res = reason;
	        }

	        await member.ban(reason).catch(error => message.channel.send(`Sorry, I coldn't ban because of: ${error}`));

	        let bean = new Discord.RichEmbed()
	        .setColor(color)
	        .setTitle(`Ban | ${member.user.tag}`)
	        .addField("User", member, true)
	        .addField("Moderator", message.author, true)
	        .addField("Reason", res)
	        .setTimestamp();

	        var channel = bot.channels.find(channel => channel.name === "bot-logs");
			if(channel){
				channel.send(bean);
			}
	   	    return;
		}
		case 'mute': {

		  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		  if(!tomute) return message.channel.send("```Syntax: !mute [@user] [time(miliseconds)]\n 1 sec = 1000 miliseconds```");
		  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you don't have permissions to use this!");
		  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I cant mute this user");
		  if (tomute.id === message.author.id) return message.channel.send("You cannot mute yourself!");
		  let muterole = message.guild.roles.find(`name`, "Muted");

		  if(!muterole){
		    try{
		      muterole = await message.guild.createRole({
		        name: "Muted",
		        color: color,
		        permissions:[]
		      })
		      message.guild.channels.forEach(async (channel, id) => {
		        await channel.overwritePermissions(muterole, {
		          SEND_MESSAGES: false,
		          ADD_REACTIONS: false
		        });
		      });
		    }catch(e){
		      console.log(e.stack);
		    }
		  }

		  let mutetime = args.slice(2).join(" ");
		  if(!mutetime) return message.channel.send("```Syntax: !mute [@user] [time(miliseconds)]\n 1 sec = 1000 miliseconds```");

		  await(tomute.addRole(muterole.id));
		  message.reply(`<@${tomute.id}> has been muted for ${mutetime}`);
		  let muteEmbed = new Discord.RichEmbed()
	        .setColor(color)
	        .setTitle(`Mute`)
	        .addField("User", tomute, true)
	        .addField("Moderator", message.author, true)
	        .addField("Time", mutetime)
	        .setTimestamp();
	        var channel = bot.channels.find(channel => channel.name === "bot-logs");
			if(channel){
				channel.send(muteEmbed);
			}

		  setTimeout(function(){
		    tomute.removeRole(muterole.id);
		    message.channel.send(`<@${tomute.id}> has been unmuted!`);
		  },mutetime);
		  return;
		}
		case 'unmute': {
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You don't have the `Manage Messages` premission");

	        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	        if(!toMute) return message.channel.sendMessage("Please mention an user or ID to mute!");

	        let role = message.guild.roles.find(r => r.name === "Muted")
	        
	        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

	        await toMute.removeRole(role);
	        message.channel.sendMessage("The user has been unmuted!");
	        return;
		}
		case 'anno': {
			var text = args.slice(1).join(" ");
			if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("You are not an administrator!");
			if(!text)return message.channel.send('```Syntax: !anno [text]```');
			var channel = bot.channels.find(channel => channel.name === "announcements");
			if(channel){
				channel.send(text);
				message.delete();
			}else {
				message.channel.send('The text channel "announcements" does not exist!');
			}
			return;
		}
		case 'addrole': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return;
			if(args[0] == "help"){
		    let helpembxd = new Discord.RichEmbed()
		    .setColor(color)
		    .addField("Addrole Command", "Usage: !addrole <@user> <role>")

		    message.channel.send(helpembxd);
		    return;
		  } 

		  let xdemb = new Discord.RichEmbed()
		  .setColor(color)
		  .setTitle(`Addrole command`)
		  .addField("Description:", "Add role to member", true)
		  .addField("Usage", "$addrole [@user] [role]", true)
		  .addField("Example", "$addrole @NiLMERB0t Member")

		  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have premmsions to do that!");
		  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		  if(!rMember) return message.channel.send(xdemb);

		  let role = args.slice(1).join(" ").slice(22);
		  if(!role) return message.channel.send("Specify a role!");
		  let gRole = message.guild.roles.find(`name`, role);
		  if(!gRole) return message.channel.send("Couldn't find that role.");

		  if(rMember.roles.has(gRole.id)) return message.channel.send("This user already have that role.");
		  await(rMember.addRole(gRole.id));

		  await message.channel.send(`***I just gave ${rMember.user.username} the ${gRole.name} role!***`);
		  	let roleLog = new Discord.RichEmbed()
	        .setColor(color)
	        .setTitle(`Add Role`)
	        .addField("User", rMember, true)
	        .addField("Moderator", message.author, true)
	        .addField("Role", role)
	        .setTimestamp();

	        var channel = bot.channels.find(channel => channel.name === "bot-logs");
			if(channel){
				channel.send(roleLog);
			}
		  return;
		}
		case 'removerole': {
			if(message.author.id != ownerID && message.author.id != ownerID2)return;
			if(args[0] == "help"){
		    let helpembxd = new Discord.RichEmbed()
		    .setColor(color)
		    .addField("Removerole Command", "Usage: $removerole <@user> <role>")

		    message.channel.send(helpembxd);
		    return;
		  } 

		  let xdemb = new Discord.RichEmbed()
		  .setColor(color)
		  .setTitle(`Removerole command`)
		  .addField("Description:", "Take role from member", true)
		  .addField("Usage", "$removerole [user] [role]", true)
		  .addField("Example", "$removerole @NiLMERB0t Member")

		  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You need the `manage members`premission to do that!.");
		  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args.slice(1));
		  if(!rMember) return message.channel.send(xdemb);

		  let role = args.slice(1).join(" ").slice(22);

		  if(!role) return message.channel.send("Specify a role!");
		  let gRole = message.guild.roles.find(`name`, role);
		  if(!gRole) return message.channel.send("Couldn't find that role.");

		  if(!rMember.roles.has(gRole.id)) return message.channel.send("This user doesn't have that role.");
		  await(rMember.removeRole(gRole.id));

		  await message.channel.send(`***I just removed ${rMember.user.username}'s ${gRole.name} role!***`);
		  let roleLog = new Discord.RichEmbed()
	        .setColor(color)
	        .setTitle(`Remove Role`)
	        .addField("User", rMember, true)
	        .addField("Moderator", message.author, true)
	        .addField("Role", role)
	        .setTimestamp();

	        var channel = bot.channels.find(channel => channel.name === "bot-logs");
			if(channel){
				channel.send(roleLog);
			}
		  return;
		}
	}

});

//--Music-system----------------------

bot.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}
	return;
});
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}


//-----------------------------------


bot.on('guildMemberAdd', member => {
	var channel = bot.channels.find(channel => channel.name === "welcome-bye");
	if(channel){
		channel.send(`[+] <@${member.id}> welcome to '${member.guild.name}'! Hope to enjoy!`);
	}
	return;
});
bot.on('guildMemberRemove', member => {
	var channel = bot.channels.find(channel => channel.name === "welcome-bye");
	if(channel){
		channel.send(`[-] <@${member.id}> left the server or was kicked!`);
	}
	return;
});
bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'User'); 

  member.addRole(role)
});



//----------------------------------