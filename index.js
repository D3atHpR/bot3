const qrcode = require('qrcode-terminal')
const {Client, MessageMedia, LocalAuth, Buttons, GroupChat, Util} = require('whatsapp-web.js')
const ffmpeg = require('@ffmpeg-installer/ffmpeg');


const client = new Client({
    puppeteer: {
        headless: true,  
        executablePath:"/usr/bin/google-chrome-stable"
      },
      ffmpegPath: ffmpeg.path,

});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message_create', msg => {
    const command = msg.body.split(' ')[0];
    // Cola seu número onde tem o 84848484, sem o 9
    const sender = msg.from.includes("84848484") ? msg.to : msg.from
    if (command === "/st")  generateSticker(msg, sender)
});

client.initialize();

const generateSticker =async(msg)=>{
    try{
        msg.react("🤘")      
    let chat = await msg.getChat();
    const media = await msg.downloadMedia();
    return chat.sendMessage(media, {
      sendMediaAsSticker: true,
      stickerName: "Sticker bot",
      stickerAuthor: "By D3 ",
    }); 
}catch(e){
        msg.reply("❌ Erro ao processar mídia")
}

}
