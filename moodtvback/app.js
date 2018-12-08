const TwitchBot = require('twitch-bot')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";

console.log(process.env.channel);

MongoClient.connect(url, function(err, db) {
  var dbo = db.db("moodTv");

  const channels = [process.env.channel]
  const emotions = ['funny', 'impressive', 'sad', 'bad', 'hype', 'spam', 'disbelieve']

  const Bot = new TwitchBot({
    username: 'Kappa_Bot',
    oauth: 'oauth:auz0riyc60kzmfuy837pssnkyot4iv',
    channels: channels
  })

  var channelEmotion = {}

  // Inicializa o objeto channelEmotion com os canais e as emoções
  // Exemplo { Canal: {Emoção1: numero ... Emoção2: numero} }
  const canal = channels[0];
  channelEmotion["name"] = canal;
  for (let i = 0; i < emotions.length; i++) {
    const emotion = emotions[i];
    channelEmotion[emotion] = 0;
  } 

  dbo.collection("channels").findOne({name: canal}, function(err, result) {
    if (err) throw err;
    console.log(result)
    if (!result) {
      dbo.collection("channels").insertOne(channelEmotion, function(err, res) {
        if (err) throw err;
      });
    }
    if (result) {
      channelEmotion = result
    }
  });

  Bot.on('join', channel => {
    console.log(`Joined channel: ${channel}`)
  })

  Bot.on('error', err => {
    console.log(err)
  })

  // Impressive emotes
  var pogchamp = new RegExp('88', 'i');
  var Kreygasm = new RegExp('41', 'i');
  var OhMyDog = new RegExp('81103', 'i');
  // Funny emotes
  var lul = new RegExp('425618', 'i');
  var kappa = new RegExp('25', 'i');
  var fourhead = new RegExp('354', 'i');
  var EleGiggle = new RegExp('4339', 'i');
  var BrokeBack = new RegExp('4057', 'i');
  // Hype emotes
  var CurseLit = new RegExp('116625', 'i');
  var TwitchLit = new RegExp('166263', 'i');
  var VoHiYo = new RegExp('81274', 'i');
  var TriHard = new RegExp('120232', 'i');
  // Sad emotes
  var BabyRage = new RegExp('22639', 'i');
  var BibleThump = new RegExp('86', 'i');
  // Bad emotes
  var DansGame = new RegExp('33', 'i');
  var WutFace = new RegExp('28087', 'i');
  var residentSleep = new RegExp('245', 'i');
  // Spam emotes
  var FrankerZ = new RegExp('65', 'i');
  var SMOrc = new RegExp('52', 'i');
  // Disbelieve emotes
  var cmonBruh = new RegExp('84608', 'i');
  var NotLikeThis = new RegExp('58765', 'i');
  // Funny expressions
  var risada1 = new RegExp("kkk+", "i");
  var risada2 = new RegExp("shua+", "i");
  var risada3 = new RegExp("hahaha+", "i");
  // Impressive expressions
  var impressive1 = new RegExp("dog+", 'i');
  var impressive2 = new RegExp("god+", 'i');
  var impressive3 = new RegExp("nice+", 'i');


  Bot.on('message', chatter => {
    if (chatter.emotes) {
      // Bloco de Ifs dos emotes
      if (pogchamp.test(chatter.emotes)) { channelEmotion["impressive"] += 1; console.log("Pogchamp"); }
      else if (Kreygasm.test(chatter.emotes)) { channelEmotion["impressive"] += 1; console.log("Kreygasm"); }
      else if (OhMyDog.test(chatter.emotes)) { channelEmotion["impressive"] += 1; console.log("OhMyDog"); }
      else if (lul.test(chatter.emotes)) { channelEmotion["funny"] += 1; console.log("LUL"); }
      else if (kappa.test(chatter.emotes)) { channelEmotion["funny"] += 1; console.log("Kappa"); }
      else if (fourhead.test(chatter.emotes)) { channelEmotion["funny"] += 1; console.log("4Head"); }
      else if (EleGiggle.test(chatter.emotes)) { channelEmotion["funny"] += 1; console.log("EleGiggle"); }
      else if (BrokeBack.test(chatter.emotes)) { channelEmotion["funny"] += 1; console.log("BrokeBack"); }
      else if (CurseLit.test(chatter.emotes)) { channelEmotion["hype"] += 1; console.log("CurseLit"); }
      else if (TwitchLit.test(chatter.emotes)) { channelEmotion["hype"] += 1; console.log("TwitchLit"); }
      else if (VoHiYo.test(chatter.emotes)) { channelEmotion["hype"] += 1; console.log("VoHiYo"); }
      else if (TriHard.test(chatter.emotes)) { channelEmotion["hype"] += 1; console.log("TriHard"); }
      else if (BabyRage.test(chatter.emotes)) { channelEmotion["sad"] += 1; console.log("BabyRage"); }
      else if (BibleThump.test(chatter.emotes)) { channelEmotion["sad"] += 1; console.log("BibleThump"); }
      else if (DansGame.test(chatter.emotes)) { channelEmotion["bad"] += 1; console.log("DansGame"); }
      else if (WutFace.test(chatter.emotes)) { channelEmotion["bad"] += 1; console.log("WutFace"); }
      else if (residentSleep.test(chatter.emotes)) { channelEmotion["bad"] += 1; console.log("Residentsleep"); }
      else if (FrankerZ.test(chatter.emotes)) { channelEmotion["spam"] += 1; console.log("FrankerZ"); }
      else if (SMOrc.test(chatter.emotes)) { channelEmotion["spam"] += 1; console.log("SMOrc"); }
      else if (cmonBruh.test(chatter.emotes)) { channelEmotion["disbelieve"] += 1; console.log("cmonBruh"); }
      else if (NotLikeThis.test(chatter.emotes)) { channelEmotion["disbelieve"] += 1; console.log("NotLikeThis"); }
    } else {
    // Bloco de Ifs de expressões
      // kkkkk+
      if (risada1.test(chatter.message)) { channelEmotion["funny"] += 1; console.log("kkkk"); }
      // shua+
      else if (risada2.test(chatter.message)) { channelEmotion["funny"] += 1; console.log("shua "); }
      // hahaha+
      else if (risada3.test(chatter.message)) { channelEmotion["funny"] += 1; console.log("hahaha "); }
      // dog
      else if (impressive1.test(chatter.message)) { channelEmotion["impressive"] += 1; console.log("dog "); }
      // god
      else if (impressive2.test(chatter.message)) { channelEmotion["impressive"] += 1; console.log("god "); }
      // nice
      else if (impressive3.test(chatter.message)) { channelEmotion["impressive"] += 1; console.log("nice "); }
    }
  })



  setInterval(function() { 

    if (err) throw err;
    var query = {name: process.env.channel};
    var newValues = { $set: channelEmotion }
    dbo.collection("channels").updateOne(query, newValues, function(err, res) {
      if (err) throw err;
      console.log("documents updated ", res.result.nModified);
    });
    console.log(channelEmotion)

  }, 20000);

});