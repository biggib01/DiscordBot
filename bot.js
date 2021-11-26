require('dotenv').config();

const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const commander = require('./take');


const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}.`);
});

bot.on("message", msg => {
  if(msg.author.bot) return

  if(msg.content === "ping"){
    msg.reply("poggers")
  }else if(msg.content === "สวัสดี" || msg.content === "ดี" || msg.content === "yo"){
    msg.reply("สวัสดี")
  }

});

bot.on('message', async message => {
    // Check for command
    if (message.content.startsWith(config.prefix)) {
      let args = message.content.slice(config.prefix.length).split(' ');
      let command = args.shift().toLowerCase();
  
      switch (command) {
  
        case 'ping':
          let msg = await message.reply('Pinging...');
          await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
          break;
        case 'callMe':
          message.reply(client.users.cache.find(user => user.username == 'USERMAME'))
          break;
        case 'say':
        case 'repeat':
          if (args.length > 0)
            message.channel.send(args.join(' '));
          else
            message.reply('You did not send a message to repeat, cancelling command.')
          break
  
        
        case 'help':
          let embed =  new MessageEmbed()
            .setTitle('HELP MENU')
            .setColor('GREEN')
            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL());
          if (!args[0])
            embed
              .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
          else {
            if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
              let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
              embed
                .setTitle(`COMMAND - ${command}`)
  
              if (commands[command].aliases)
                embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
              embed
                .addField('DESCRIPTION', commands[command].description)
                .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
            } else {
              embed
                .setColor('RED')
                .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
            }
          }
          message.channel.send({ embeds: [embed] })
          break;
        case 'take':
          let embe =  new MessageEmbed()
            .setTitle('Chilling menu boiz☕')
            .setColor('GREEN')
            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL());
          if (!args[0])
            embe
              .setDescription(Object.keys(commander).map(command => `\`${command.padEnd(Object.keys(commander).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commander[command].description}`).join('\n'));
          else {
            if (Object.keys(commander).includes(args[0].toLowerCase()) || Object.keys(commander).map(c => commander[c].aliases || []).flat().includes(args[0].toLowerCase())) {
              let command = Object.keys(commander).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commander).find(c => commander[c].aliases && commander[c].aliases.includes(args[0].toLowerCase()));
              embe
                .setTitle(`COMMAND - ${command}`)
  
              if (commander[command].aliases)
                embe.addField('Command aliases', `\`${commander[command].aliases.join('`, `')}\``);
              embe
                .addField('DESCRIPTION', commander[command].description)
                .addField('FORMAT', `\`\`\`${config.prefix}${commander[command].format}\`\`\``);
            } else {
              embe
                .setColor('RED')
                .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
            }
          }
          message.channel.send({ embeds: [embe] })
          break;
      }
    }
  });

bot.login(process.env.TOKEN);