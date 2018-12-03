const TwitchBot = require('twitch-bot')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  var dbo = db.db("moodTv");

  const channels = ['#yoda', '#gosu', '#rakin', '#shroud', '#jukes', '#tfue', '#aydan', '#dakotaz', '#lospollostv', '#yassuo', '#iwilldominate',
  '#solary', '#p4wnyhof', '#casamentonerd', '#jovirone', '#gratis150ml']
  const emotions = ['funny', 'impressive', 'sad', 'bad']

  const Bot = new TwitchBot({
    username: 'Kappa_Bot',
    oauth: 'oauth:auz0riyc60kzmfuy837pssnkyot4iv',
    channels: channels
  })

  var channelEmotion = {}

  // Inicializa o objeto channelEmotion com os canais e as emoções
  // Exemplo { Canal: {Emoção1: numero ... Emoção2: numero} }
  for (let i = 0; i < channels.length; i++) {
    const canal = channels[i];
    const filteredChannel = canal;
    channelEmotion[filteredChannel] = {};
    for (let i = 0; i < emotions.length; i++) {
      const emotion = emotions[i];
      channelEmotion[filteredChannel][emotion] = 0;
    } 
  }

  dbo.collection("emotions").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result)
    if (!result) {
      dbo.collection("emotions").insertOne(channelEmotion, function(err, res) {
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

  var pogchamp = new RegExp('88', 'i');
  var Kreygasm = new RegExp('41', 'i');
  var lul = new RegExp('425618', 'i');
  var kappa = new RegExp('25', 'i');
  var fourhead = new RegExp('354', 'i');
  var BabyRage = new RegExp("22639", 'i');
  var BibleThump = new RegExp("86", 'i');
  var DansGame = new RegExp("33", 'i');
  var WutFace = new RegExp("28087", 'i');
  var residentSleep = new RegExp("245", 'i');
  var risada1 = new RegExp("kkk+", "i");
  var risada2 = new RegExp("shua+", "i");
  var risada3 = new RegExp("hahaha+", "i");
  var impressive1 = new RegExp("dog+", 'i');
  var impressive2 = new RegExp("god+", 'i');
  var impressive3 = new RegExp("nice+", 'i');


  Bot.on('message', chatter => {
    if (chatter.emotes) {
      // Bloco de Ifs dos emotes
      if (pogchamp.test(chatter.emotes)) { channelEmotion[chatter.channel]["impressive"] += 1; console.log("Pogchamp"); }
      else if (Kreygasm.test(chatter.emotes)) { channelEmotion[chatter.channel]["impressive"] += 1; console.log("Kreygasm"); }
      else if (lul.test(chatter.emotes)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("LUL"); }
      else if (kappa.test(chatter.emotes)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("Kappa"); }
      else if (fourhead.test(chatter.emotes)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("4Head"); }
      else if (BabyRage.test(chatter.emotes)) { channelEmotion[chatter.channel]["sad"] += 1; console.log("BabyRage"); }
      else if (BibleThump.test(chatter.emotes)) { channelEmotion[chatter.channel]["sad"] += 1; console.log("BibleThump"); }
      else if (DansGame.test(chatter.emotes)) { channelEmotion[chatter.channel]["bad"] += 1; console.log("DansGame"); }
      else if (WutFace.test(chatter.emotes)) { channelEmotion[chatter.channel]["bad"] += 1; console.log("WutFace"); }
      else if (residentSleep.test(chatter.emotes)) { channelEmotion[chatter.channel]["bad"] += 1; console.log("Residentsleep"); }
    } else {
    // Bloco de Ifs de expressões
      // kkkkk+
      if (risada1.test(chatter.message)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("kkkk"); }
      // shua+
      else if (risada2.test(chatter.message)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("shua "); }
      // hahaha+
      else if (risada3.test(chatter.message)) { channelEmotion[chatter.channel]["funny"] += 1; console.log("hahaha "); }
      // dog
      else if (impressive1.test(chatter.message)) { channelEmotion[chatter.channel]["impressive"] += 1; console.log("dog "); }
      // god
      else if (impressive2.test(chatter.message)) { channelEmotion[chatter.channel]["impressive"] += 1; console.log("god "); }
      // nice
      else if (impressive3.test(chatter.message)) { channelEmotion[chatter.channel]["impressive"] += 1; console.log("nice "); }
    }
  })



  setInterval(function() { 

    console.log(channelEmotion)

    if (err) throw err;
    var query = {_id: channelEmotion._id};
    var newValues = { $set: channelEmotion }
    dbo.collection("emotions").updateOne(query, newValues, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted ", res.result.nModified);
    });
    console.log(channelEmotion)

  }, 7000);

});