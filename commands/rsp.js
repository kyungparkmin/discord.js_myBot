const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);

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
          .setStyle('SECONDARY'),
      )
      .addComponents(
        new MessageButton()
          .setCustomId("paper")
          .setLabel("보")
          .setStyle('DANGER'),
      )
    await interaction.reply({components: [row], ephemeral: true});

    const filter = i => i.customId === 'rock' || i.customId === 'paper' || i.customId === 'scissors';
    
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    const random = Math.floor(Math.random() * 3);
    const rsp = ["scissors", "rock", "paper"];
    const bot = rsp[random];
    let winner;

      
    collector.on('collect', async i => {
      if (i.customId === 'rock' && bot == "paper") {
        await i.reply({ content: 'bot win', ephemeral: true});
      }else if(i.customId === 'paper' && bot == "scissors") {
        await i.reply({ content: 'bot win'});
      }else if(i.customId === "scissors" && bot == "rock"){
        await i.reply({ content: "bot win"});
      }else if(i.customId == bot){
        await i.reply({ content: "draw", ephemeral: true});
      }else{
        await i.reply({ content: "you win" });
      }
    });

    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

  },
};