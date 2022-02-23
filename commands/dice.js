const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed,MessageAttachment} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("주사위")
    .setDescription("주사위를 굴립니다"),
  async execute(interaction) {
    const random = Math.floor((Math.random() * 6)+1);
    const image = new MessageAttachment(`./public/${random}.png`);
    const EmbedMessage = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(`주사위 숫자 : ${random}`)
      .setImage([`/public/${random}.png`]);
    
    await interaction.reply({
      embeds: [EmbedMessage],
      files: [image]
    });
    
    
  },
};