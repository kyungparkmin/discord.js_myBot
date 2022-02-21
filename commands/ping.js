const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("출석")
    .setDescription("출석 체크를 합니다"),
  async execute(interaction) {
    
    var userJsonFile = "./data/userData.json";
    var userData = JSON.parse(fs.readFileSync(userJsonFile, "utf-8"));

    const point = interaction.options._hoistedOptions[0].value;
    userData.users[userId].point += point;
    fs.writeFileSync(userJsonFile, JSON.stringify(userData));
    await interaction.reply({ content: `I successfully gave you ${point} point.\nYour have ${userData.users[userId].point} point` });
    
    
  },
};