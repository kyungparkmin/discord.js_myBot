const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageButton } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("출석")
    .setDescription("출석 체크를 함"),
  async execute(interaction) {
    await interaction.reply("호!");
  },
};