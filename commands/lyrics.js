const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const { geniusApi } = require("../config.json");
const Genius = require("genius-lyrics");
const Client = new Genius.Client(geniusApi);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("가사")
    .setDescription("가사를 불러옴")
    .addStringOption((option)=>
      option 
        .setName('title')
        .setDescription("노래 제목을 입력하세요")
    ),
  async execute(interaction) {
    const musicTitle = interaction.options.getString('title');

    const searches = await Client.songs.search(musicTitle);

    // Pick first one
    const firstSong = searches[0];
    //console.log("About the Song:\n", firstSong, "\n");

    // Ok lets get the lyrics
    const lyrics = await firstSong.lyrics();
    //console.log("Lyrics of the Song:\n", lyrics, "\n");

    interaction.reply(lyrics);

    /*const data = lyrics;
    fs.writeFile('lyrics.txt', data, 'utf8', function(error){
      console.log('write end');
    })
    if(data >= 2000){
      fs.readFile('lyrics.txt', 'utf8', function(err, data){
        interaction.reply(data);
        console.log('2000 down')
      })
    }else{
      ///interaction.reply(textFile);
      //message.channel.send("Testing message.", { files: ['../lyrics.txt'] });
      interaction.reply(fs.readFileSync('lyrics.txt', {"encoding": "utf-8"}))
      console.log('2000 over');
    }*/
  },
};