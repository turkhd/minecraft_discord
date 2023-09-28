Minecraft sunucusunun durumunu Discord botuyla kontrol etmek için JavaScript
discord.js ve minecraft-server-util adlı kütüphaneleri kullanır. İlk olarak bu kütüphaneleri projenize eklemeniz gerekecektir.

Kod

npm install discord.js minecraft-server-util

const Discord = require('discord.js');
const util = require('minecraft-server-util');

const client = new Discord.Client();
const TOKEN = 'YOUR_DISCORD_BOT_TOKEN'; // Discord botunuzun token'ını buraya ekleyin
const SERVER_IP = 'minecraft_server_ip'; // Minecraft sunucu IP adresini buraya ekleyin
const SERVER_PORT = 25565; // Minecraft sunucu portunu buraya ekleyin

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (message.content === '!mcstatus') { // Belirli bir komutla çalışmasını isterseniz değiştirin
    try {
      const response = await util.status(SERVER_IP, { port: SERVER_PORT });
      const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Minecraft Sunucu Durumu')
        .addField('IP', SERVER_IP, true)
        .addField('Port', SERVER_PORT, true)
        .addField('Oyuncu Sayısı', `${response.onlinePlayers}/${response.maxPlayers}`, true)
        .addField('Sürüm', response.version, true)
        .setFooter('Minecraft Sunucu Durumu');

      message.channel.send(embed);
    } catch (error) {
      message.channel.send('Minecraft sunucusu çevrimdışı veya erişilemez.');
    }
  }
});

client.login(TOKEN);
