const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const {weatherapi} = require('../config.json');
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
    getWeather(city);
    await interaction.reply('dfad');
    
  },
};


function getWeather(city){
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherapi}&units=metric&lang=kr`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
    })
}