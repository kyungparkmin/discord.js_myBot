const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("뉴스")
    .setDescription("헤드라인 뉴스를 보여줍니다"),
  async execute(interaction) {
    await interaction.reply("호!");
  },
};