const { SlashCommandBuilder } = require("@discordjs/builders");
const {MessageEmbed} = require('discord.js');
const School = require('school-kr')
const school = new School();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("급식")
    .setDescription("급식을 알려줍니다"),
  async execute(interaction) {
    school.init(School.Type.HIGH, School.Region.GYEONGBUK, 'R100000822');

    const meal = await school.getMeal();

    const Meal = new MessageEmbed()
      .setTitle(`${meal.month}월 ${meal.day}일`)
      .setDescription(meal.today)

    interaction.reply({embeds: [Meal]});
  },
};