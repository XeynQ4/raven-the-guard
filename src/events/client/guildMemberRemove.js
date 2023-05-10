const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member, client) {
    const guild = member.guild;
    if (!guild.available) return;

    const channel = guild.systemChannel;
    if (!channel) return;

    const byeEmbed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Bye")
      .setDescription(`**${member.displayName}** left :cry:`)
      .setThumbnail(guild.iconURL());

    await channel.send({ embeds: [byeEmbed] }).catch(console.error);
  },
};
