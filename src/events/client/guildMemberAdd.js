const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    const guild = member.guild;
    if (!guild.available) return;

    const channel = guild.systemChannel;
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Welcome!")
      .setDescription(`Hey ${member}, welcome to **${guild}**!`)
      .setThumbnail(guild.iconURL());

    await channel.send({ embeds: [welcomeEmbed] }).catch(console.error);
  },
};
