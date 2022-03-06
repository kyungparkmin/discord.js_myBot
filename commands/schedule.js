const { SlashCommandBuilder } = require("@discordjs/builders");
const {MessageEmbed} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("시간표")
    .setDescription("시간표를 보여줍니다"),
  async execute(interaction) {
    var date = new Date();

    var days = ["일", "월", "화", "수", "목", "금", "토"];

    if(days[date.getDay()] == "월"){
      const MonDay = new MessageEmbed()
        .setTitle('월요일 시간표')
        .setDescription(
          '1교시: 자습\n' +
          '2교시: 운건\n' +
          '3교시: 한국사\n' +
          '4교시: 프언\n' + 
          '5교시: 수학1\n' +
          '6교시: 프언\n' +
          '7교시: 프언\n' + 
          '준비물: 체육복, 운동화'
        )
        interaction.reply({ embeds: [MonDay] })
    }else if(days[date.getDay()] == "화"){
      const Tuesday = new MessageEmbed()
        .setTitle('화요일 시간표')
        .setDescription(
          '1교시: 음악연주\n' +
          '2교시: 사회\n' +
          '3교시: 영문\n' +
          '4교시: 프언\n' + 
          '5교시: 화면\n' +
          '6교시: 수학1\n' +
          '7교시: 한국사\n'
        )
        interaction.reply({ embeds: [Tuesday] })
    }else if(days[date.getDay()] == "수"){
      const Wednesday = new MessageEmbed()
        .setTitle('수요일 시간표')
        .setDescription(
          '1교시: 프언\n' +
          '2교시: 프언\n' +
          '3교시: 사회\n' +
          '4교시: 수학1\n' + 
          '5교시: 실용국어\n' +
          '6교시: 한국사\n' +
          '7교시: 운건\n' + 
          '준비물: 체육복, 운동화'
        )
        interaction.reply({ embeds: [Wednesday] })
    }else if(days[date.getDay()] == "목"){
      const Tuesday = new MessageEmbed()
        .setTitle('목요일 시간표')
        .setDescription(
          '1교시: 진로\n' +
          '2교시: 영문\n' +
          '3교시: 사회\n' +
          '4교시: 수학1\n' + 
          '5교시: 화면\n' +
          '6교시: 화면\n' +
          '7교시: 화면\n'
        )
        interaction.reply({ embeds: [Tuesday] })
    }else if(days[date.getDay()] == "금"){
      const Friday = new MessageEmbed()
        .setTitle('금요일 시간표')
        .setDescription(
          '1교시: 문화앱\n' +
          '2교시: 문화앱\n' +
          '3교시: 문화앱\n' +
          '4교시: 문화앱\n' + 
          '5교시: 동아리\n'
        )
        interaction.reply({ embeds: [Friday] })
    }else if(days[date.getDay()] == "토" || days[date.getDay()] == '일'){
      const rest = new MessageEmbed()
        .setTitle('시간표 X')
        .setDescription('즐거운 주말!!!!!!!')
      
      interaction.reply({ embeds: [rest]})
    }

    

    //console.log("오늘은 " + days[date.getDay()] + "요일입니다.");

    

  },
};