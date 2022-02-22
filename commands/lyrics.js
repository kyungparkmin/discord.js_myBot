const { SlashCommandBuilder } = require("@discordjs/builders");
const { geniusApi } = require("../config.json");
const Genius = require("genius-lyrics");
const Client = new Genius.Client(geniusApi);
const newLocal = 'music';
module.exports = {
  data: new SlashCommandBuilder()
    .setName("가사")
    .setDescription("가사를 불러옴"),
    /*.addSubcommand(subcommand =>
      subcommand
        .setName('노래 제목')
        .setDescription('노래 제목을 입력하세요')),
        //.addUserOption(option => option.setName(newLocal).setDescription('노래 제목 입력'))),
        */
  async execute(interaction) {
    
    const searches = await Client.songs.search("starboy");

    // Pick first one
    const firstSong = searches[0];
    console.log("About the Song:\n", firstSong, "\n");

    // Ok lets get the lyrics
    const lyrics = await firstSong.lyrics();
    console.log("Lyrics of the Song:\n", lyrics, "\n");
    await interaction.reply(lyrics);
    
  },
};