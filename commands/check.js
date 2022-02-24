const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("출석")
    .setDescription("출석 체크를 합니다"),
  async execute(interaction) {
    
    if(interaction.isCommand()){
      var userJsonFile = './data/userData.json';
      var userData = JSON.parse(fs.readFileSync(userJsonFile), "utf-8");
  
      const userId = interaction.member.user.id;
      const userName = interaction.member.user.username;
      
      console.log(userId, userName);
      if(!userData.users[userId]){
        userData.users[userId] = {
          name: userName,
          point: 0
        };
        fs.writeFileSync(userJsonFile, JSON.stringify(userData));
      }
      userData.users[userId].point += 10;
    fs.writeFileSync(userJsonFile, JSON.stringify(userData));
    }
    
    await interaction.reply({ content: `10 포인트 지급` });
    
    
  },
};