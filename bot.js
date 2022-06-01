const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');



const client = new Client();


const help =""



client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', async message => {
  const command = message.body.slice(1).trim().split(/ +/).shift().toLowerCase()
  
    switch(command)
    {
      case'ping':
       message.reply('pong')
       break
      case 'help':
        message.reply(help)
        break
      case 'meme':
        const meme = await axios("https://meme-api.herokuapp.com/gimme/memes")
        .then(res => res.data)

        //const media = MessageMedia.fromUrl(meme.url);
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
        break
      case 'covid':
        const info = await axios("https://coronavirus-19-api.herokuapp.com/countries/india")
        .then(res => res.data)
        message.reply(`INDIA has a total of : + \*\*${info.cases}\*\*\ + covid cases ` ,)
        break

    }
	
    
    
});

client.on('ready', () => {
    console.log('Initialized');
});

client.initialize();

