const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete multiple messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");

    if (amount <= 0)
      return await interaction.reply({
        content: "Amount must be a positive number",
        ephemeral: true,
      });

    return await interaction.channel
      .bulkDelete(amount)
      .then((messages) =>
        interaction.reply({
          content: `Deleted ${messages.size} messages`,
          ephemeral: true,
        })
      )
      .catch(console.error);
  },
};
