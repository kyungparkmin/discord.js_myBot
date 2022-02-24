const { SlashCommandBuilder } = require("@discordjs/builders");
const {weatherapi} = require('../config.json');
const fetch = require('node-fetch');
const {MessageEmbed} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("날씨")
    .setDescription("내 위치의 날씨를 받아옵니다")
    .addStringOption((option)=>
      option 
        .setName('city')
        .setDescription("지역 이름을 영어로 입력하세요")
    ),
  async execute(interaction) {
    let city = interaction.options.getString('city');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherapi}&units=metric&lang=kr`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const EmbedMessage = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`${city}의 날씨`)
        .setImage(`https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`)
        .setDescription(`${json.weather[0].description}`)
        .addFields(
          { name: '온도', value:`${json.main.temp}`},
          { name: '최고기온', value:`${json.main.temp_max}`},
          { name: '최저기온', value:`${json.main.temp_min}`},
          { name: '풍속', value:`${json.wind.speed}`},
        )
        .setTimestamp() 
        interaction.reply({ embeds: [EmbedMessage] })
    })
  },
};