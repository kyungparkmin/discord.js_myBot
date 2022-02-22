const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("가위바위보")
    .setDescription("가위바위보 게임을 합니다"),
  async execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("가위")
          .setLabel("가위")
          .setStyle('PRIMARY'),
      )
      .addComponents(
        new MessageButton()
          .setCustomId("바위")
          .setLabel("바위")
          .setStyle('SECONDARY'),
      )
      .addComponents(
        new MessageButton()
          .setCustomId("보")
          .setLabel("보")
          .setStyle('DANGER'),
      )
    const message = await interaction.reply({components: [row], ephemeral: true});

    const filter = i => i.customId === '가위' || i.customId === '바위' || i.customId === '보';
    
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    const random = Math.floor(Math.random() * 3);
    const rsp = ["가위", "바위", "보"];
    const bot = rsp[random];
      
    collector.on('collect', async i => {
      const wait = require('util').promisify(setTimeout);
      if (i.customId === '바위' && bot == "보") {
        await i.deferUpdate();
		    await wait(500);
		    await i.editReply({ content: `유저: ${i.customId}\n봇: ${bot}\n패배`, components: []});
      }else if(i.customId === '보' && bot == "가위") {
        await i.deferUpdate();
        await wait(500);
        await i.editReply({ content: `유저: ${i.customId}\n봇: ${bot}\n패배`, components: []});
      }else if(i.customId === "가위" && bot == "바위"){
        await i.deferUpdate();
        await wait(500);
        await i.editReply({ content: `유저: ${i.customId}\n봇: ${bot}\n패배`, components: []});
      }else if(i.customId == bot){
        await i.deferUpdate();
        await wait(500);
        await i.editReply({ content: `유저: ${i.customId}\n봇: ${bot}\n무승부`, components: []});
      }else{
        await i.deferUpdate();
		    await wait(500);
		    await i.editReply({ content: `유저: ${i.customId}\n봇: ${bot}\n승리\n포인트: ${point}`, components: []});
      }
    });
    
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
      if(`${collected.size}` === 1){
        setTimeout(() => channel.messages.delete('message'), 1000);
      }
    })
  },
};