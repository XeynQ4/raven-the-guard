const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command)
      return console.error(`No command matching ${commandName} was found.`);

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`Error executing ${commandName}`);
      console.error(error);
      await interaction.reply({
        content: "Something went wrong while executing this command...",
        ephemeral: true,
      });
    }
  },
};
