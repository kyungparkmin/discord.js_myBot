const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("서버 준비 완료!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if(interaction.isCommand()){
    var userJsonFile = './data/userData.json';
    var userData = JSON.parse(fs.readFileSync(userJsonFile), "utf-8");

    const userId = interaction.member.user.id;
    const userName = interaction.member.user.username;
    
    if(!userData.users[userId]){
      userData.users[userId] = {
        name: userName,
        point: 0
      };
      fs.writeFileSync(userJsonFile, JSON.stringify(userData));
    }
  }
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }


});

client.login(token);