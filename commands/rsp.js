const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("가위바위보")
    .setDescription("가위바위보 게임을 합니다"),
  async execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("scissors")
          .setLabel("가위")
          .setStyle('PRIMARY'),
      )
      .addComponents(
        new MessageButton()
          .setCustomId("rock")
          .setLabel("바위")
          .setStyle('SECONDARY')
      )
      .addComponents(
        new MessageButton()
          .setCustomId("paper")
          .setLabel("보")
          .setStyle('DANGER')
      )
    await interaction.reply({components: [row]});

    const filter = i => i.customId === 'rock' || i.customId === 'paper' || i.customId === 'scissors';

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'rock') {
        await i.reply({ content: 'rock', components: [] });
      }else if(i.customId === 'paper') {
        await i.reply({ content: 'paper'});
      }else{
        await i.reply({content: 'scissors'});
      }
    });

    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

  },
};