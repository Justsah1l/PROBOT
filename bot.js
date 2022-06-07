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
  //const command = message.body.slice(1).trim().split(/ +/).shift().toLowerCase()
  //const args = message.body.slice(7).trim().split(/ +/).shift().toLowerCase()
  //const args = message.body.slice(1).split(/ +/);
  //const command = args.shift().toLowerCase();
  const prefix = '!'
  const args = message.body.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

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
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
        break
      case 'covid':
        //if (!args[0]) return message.reply('you need to enter a country name')
        //const url = `https://coronavirus-19-api.herokuapp.com/countries/${args}`
        //const info = await axios(url)
        //.then(res => res.data)
        //message.reply(`INDIA has a total of : + \*\*${info.cases}\*\*\ + covid cases ` ,)
        if (!args) return message.reply('you need to enter a country name')
        const url = `https://coronavirus-19-api.herokuapp.com/countries/${args}`
        const info  = await axios(url)
        .then(res => res.data)
        let text = info.country.toUpperCase()
        message.reply(`${text} has a total of ${info.cases} cases right now \n${text} has a total of ${info.deaths} deaths right now` ,)
        

    }
	
    
    
});

client.on('ready', () => {
    console.log('Initialized');
});

client.initialize();







