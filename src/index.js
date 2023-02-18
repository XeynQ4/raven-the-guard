const fs = require("fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

require("dotenv").config();
const { DISCORD_TOKEN: token } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
client.commandArray = [];

// Calling functions inside ./src/functions
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(token);
