const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("주사위")
    .setDescription("주사위를 굴립니다"),
  async execute(interaction) {
    const random = Math.floor((Math.random() * 6)+1);
    const EmbedMessage = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(`주사위 숫자 : ${random}`)
     
    if(random == 1){
      
    }
    await interaction.reply({ content: `${random}` });
    
    
  },
};