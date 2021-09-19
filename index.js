//Minecraft Server Discord bot by Gonçalo Mano - 2020
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const util = require('minecraft-server-util');
const status = require('minecraft-server-status');
const prefix = "-" //define o prefixo do bot.
const isReachable = require('is-reachable');
const fs = require('fs');
var mysql = require('mysql');
const { kMaxLength } = require("buffer");
const lemaID = '360832415184191489'
var con = mysql.createConnection({
    host: "survival.manos.pt",
    user: "user",
    password: "password",
    database: "basededados"
  });


const AjudaEnviada = {
    color : 0xffa500,
    title : 'Maninho diz:',
    fields: [
		{
			name: 'Feito!',
			value: 'Ve os teus DMs',
        },
    ],
};

var SurvivalOff = {
    color : 0xffa500,
    title : 'Estado dos nossos Servers',
    fields: [
        {
            name: 'Survival',
            value: 'Aww!O survival ainda não está online😔',
            
        },
    ],
};

var SkypvpOff = {
    color : 0xffa500,
    title : 'Estado dos nossos Servers',
    fields: [
        {
            name: 'SkyPvP',
            value: 'Aww!O SkyPvP ainda não está online😔',
            
        },
    ],
};

var BungeeOff = {
    color : 0xffa500,
    title : 'Estado dos nossos Servers',
    fields: [
        {
            name: 'Geral',
            value: 'Nenhum dos nossos servers parece estar online 🤕',
            
        },
    ],
};

var SurvivalOn = {
    color : 0xffa500,
    title : 'Estado dos nossos Servers',
    fields: [
        {
            name: 'Survival',
            value: 'PartyTime 🥳!O survival está online',
            
        },
    ],
};

var SkypvpOff = {
    color : 0xffa500,
    title : 'Estado dos nossos Servers',
    fields: [
        {
            name: 'SkyPvP',
            value: 'Aww😔, O skyPvP não está Online',
            
        },
    ],
};

const Ajuda = {
	color: 0x0099ff,
	title: '(っ◔◡◔)っ ♥ Ajuda do maninho ♥',
	author: {
		name: 'Maninho',
		icon_url: 'https://i.imgur.com/jPEhLOe.png',
		url: 'https://discord.com/api/oauth2/authorize?client_id=794642183591297035&permissions=8&scope=bot',
	},
	description: 'Para usares os comandos usa o prefixo (-)',
	thumbnail: {
		url: 'https://i.imgur.com/GEjjcKM.png',
	},
	fields: [
        {
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
        {
			name: '-𝓱𝓮𝔂',
			value: 'Dá-me um olázinho😋.',
		},
		{
			name: '-𝓸𝓷𝓵𝓲𝓷𝓮',
			value: '👾Usa este comando para saber os servers da nossa network que estão online.👾',
		},
		{
			name: '-𝓫𝓪𝓵𝓽𝓸𝓹',
			value: 'Mostra o ranking de dinheiro do survival.',
        },
        {
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
	],
	image: {
	},
	timestamp: new Date(),
	footer: {
		text: 'Maninho V1.0.0 by lemanuh',
		icon_url: 'https://i.imgur.com/jPEhLOe.png',
	},
};


client.on("ready", () => {
    client.user.setActivity('-ajuda', { type: 'WATCHING' });
});

client.on("message", (message) => {
    if(message.author.id != lemaID || !message.content.startsWith("-") || message.author.bot) return;

    const args = message.content.slice(1).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == "dizer"){
        var announcement = "";
        for (const word in args) {
            announcement = announcement + args[word] + " ";
        }
        message.channel.send(announcement)
        message.delete({ timeout: 50 })
    }

});


client.on("message", function(message) { //COMANDO AJUDA
    if (message.author.bot) return; //se o autor da mensagem for um bot , para tudo , para evitar loops e outros problemas
    if (!message.content.startsWith(prefix)) return;//verifica se começa com o prefixo
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               //<-- Proçessamento da mensagem 
    const command = args.shift().toLowerCase(); 
    if (command === "ajuda") {
        message.reply({ embed: AjudaEnviada })
        .then(msg => {
            msg.delete({ timeout: 3000 })
          })
        message.delete({ timeout: 3000 })
        message.author.send("𝗛𝗲𝘆𝘆, o meu nome é 𝗺𝗮𝗻𝗶𝗻𝗵𝗼 e estou aqui para 𝘁𝗲 𝗮𝗷𝘂𝗱𝗮𝗿 !")
        message.author.send({ embed: Ajuda })
    }  
                                         
});                

client.on("message", function(message) {  //COMANDO HEY
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "hey") {
        message.reply("Olá! 😁");
    }                                        
});


client.on("message", function(message) {  //COMANDO BALTOP
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "baltop") {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT player_name FROM Essentials_userdata WHERE money=(SELECT MAX(money) FROM Essentials_userdata)", function (err, result, fields) {
          if (err) throw err; 
          console.log(result)
          con.query("SELECT MAX(money) FROM Essentials_userdata ", function (err, dimdim, fields) {
            if (err) throw err; 
                console.log(dimdim)
                var baltop1 = (JSON.stringify(result));
                var dimdim1 = (JSON.stringify(dimdim))
                var baltop1final = baltop1.slice(17,-3);
                var dimdim1final = dimdim1.slice(15,-2);
                var baltop = new Discord.MessageEmbed()
                if (err) throw err;
                     .setColor('#0099ff')
                     .setTitle('𝕭𝖆𝖑𝖙𝖔𝖕- Players com muito dim dim')
                     .setAuthor('Maninho', 'https://i.imgur.com/jPEhLOe.png')
                     .addFields(
                         { name: 'Top 1', value: baltop1final + " ➦ " +dimdim1final, inline: true },
                     )
                     message.channel.send(baltop);
                     con.end();
                     console.log("Connection Ended")
                });  
          });
      });                           
};
});
client.on("message", function(message) {  //COMANDO ONLINE

    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "online") {
        (async () => {

            if(await isReachable('mano.dynu.net:25566') == true){ //survival
                let survivalon="Online🥳";
                console.log(survivalon);
                if(await isReachable('mano.dynu.net:25573') == true){ //skypvp
                    let skypvponline="Online🥳";
                    var serverson = new Discord.MessageEmbed()
                
                    .setColor('#0099ff')
                    .setTitle('Servers Online')
                    .setAuthor('Maninho', 'https://i.imgur.com/jPEhLOe.png')
                    .addFields(
                        { name: 'Survival', value: survivalon, inline: true },
                        { name: 'Skypvp', value: skypvponline, inline: true },
                    )
                    console.log(skypvponline);
                    message.channel.send(serverson);
                }else{
                    let skypvponline = "Offline😔";
                    var serverson = new Discord.MessageEmbed()
                
                    .setColor('#0099ff')
                    .setTitle('Servers Online')
                    .setAuthor('Maninho', 'https://i.imgur.com/jPEhLOe.png')
                    .addFields(
                        { name: 'Survival', value: survivalon, inline: true },
                        { name: 'Skypvp', value: skypvponline , inline: true},
                    )
                    message.channel.send(serverson);s
                }

            }else{
                survivalon="Offline😔";
                var serverson = new Discord.MessageEmbed()
            
                .setColor('#0099ff')
                .setTitle('Servers Online')
                .setAuthor('Maninho', 'https://i.imgur.com/jPEhLOe.png')
                .addFields(
                    { name: 'Survival', value: survivalon , inline: true},
                )
                message.channel.send(serverson);
            }
        })(); 
    }                         
});    

client.on("message", function(message) {  //COMANDO SURVIVAL
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "survival") {
        util.status('mano.dynu.net', { port: 25566, enableSRV: true, timeout: 5000, protocolVersion: 47 }) 
        .then((response) => { 
            var SurvivalStats = {
                color : 0xffa500,
                title : 'Survival',
                fields: [
                    {
                        name: 'Players Online',
                        value: response.onlinePlayers,
                        
                    },
                    {
                        name: 'Maximo de Players',
                        value: response.maxPlayers,
                        
                    }

                ],
            };
            message.reply({embed: SurvivalStats});
         })
            .catch((error) => {
                message.reply({ embed: SurvivalOff }); 
            });
    }
}); 

client.on("message", function(message) {  //COMANDO SkyPvP
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "skypvp") {
        util.status('mano.dynu.net', { port: 25573, enableSRV: true, timeout: 5000, protocolVersion: 47 }) // These are the default options
        .then((response) => { 
            var SurvivalStats = {
                color : 0xffa500,
                title : 'SkyPvP',
                fields: [
                    {
                        name: 'Players Online',
                        value: response.onlinePlayers,
                        
                    },
                    {
                        name: 'Maximo de Players',
                        value: response.maxPlayers,
                        
                    }

                ],
            };
            message.reply({embed: SurvivalStats});
         })
            .catch((error) => {
                message.reply({ embed: SkypvpOff }); 
            });
    }
});

client.on("message", function(message) {  //COMANDO BALTOP
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');                               
    const command = args.shift().toLowerCase(); 
    if (command === "BALTOP") {
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM customers", function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
          });
    }                                        
});
  

client.login(config.BOT_TOKEN);//faz login com o token encontrado em config.json
696799370997137428