const fs = require("fs");
const { REST, Routes } = require("discord.js");
const { CLIENT_ID: clientId, DISCORD_TOKEN: token } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if ("data" in command && "execute" in command) {
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ./src/commands/${folder}/${file} is missing a required "data" or "execute" property.`
          );
        }
      }
    }

    const rest = new REST({ version: "10" }).setToken(token);
    try {
      console.log(
        `Started refreshing ${commandArray.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: commandArray,
      });

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  };
};
