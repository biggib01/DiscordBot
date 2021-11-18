require('dotenv').config();

const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}.`);
});

bot.on('message', msg => {
    console.log(msg.content);
});


bot.login(process.env.TOKEN);