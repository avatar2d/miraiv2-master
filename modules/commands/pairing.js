module.exports.config = {
  name: "pairing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MewMew",
  description: "Tìm Kiếm Nửa Kia Của Bạn",
  commandCategory: "Roleplay",
  usages: "[pairing/boy/girl]",
  cooldowns: 300
}
module.exports.run = async ({ api, event, args, Users, Threads }) => {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  let dataThread = await Threads.getData(event.threadID);
  let nameThread = (dataThread.threadInfo).threadName;
  //var nameUser = await Users.getNameUser(event.senderID);
  //var idbox = event.threadID;
   //let uidUser = event.senderID;
  const listAdmin = global.config.ADMINBOT;
  var idad = listAdmin;
  if (!args[0]) {
    var ThreadInfo = await api.getThreadInfo(event.threadID);
    var all = ThreadInfo.userInfo;
    let data = [];
    for (let u of all) {
      if (u.gender == "MALE") {
        if (u != event.senderID) data.push(u.id)
      }
      if (u.gender == "FEMALE") {
        if (u != event.senderID) data.push(u.id)
      }
    }
    /*for (var idad of listAdmin) {
      api.sendMessage(`⁂➻❥ Spam lệnh pairing từ: ${nameUser}⁂➻❥ \n⁂➻❥ Box Name: ${nameThread} \n Box ID: ${idbox}`,idad, event.threadID, event.messageID)
    }*/
    console.log(nameThread, data)
    if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
    let e = data[Math.floor(Math.random() * data.length)]
    let d = await api.getUserInfo(e);
    let a = (Math.random() * 50) + 50;
    let n = d[e].name
    let b = d[e].gender
    let url = d[e].profileUrl;

    let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, 'utf-8'));
    api.sendMessage({
      body: `Tìm Kiếm Nửa Kia Của Bạn\nTên: ${n}\nGiới Tính: ${(b == 2) ? "Nam" : (b == 1) ? "Nữ" : "Gay"}\nMối Quan Hệ: Độc Thân (có thể)\nĐộ Phù Hợp: ${a.toFixed(2)}%\nInbox: m.me/${e}\nProfile: ${url}`,
      attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
  }
  else {
    var ThreadInfo = await api.getThreadInfo(event.threadID);
    var all = ThreadInfo.userInfo;
    let data = [];
    if (args[0] == "boy") {
      for (let u of all) {
        if (u.gender == "MALE") {
          if (u != event.senderID) data.push(u.id)
        }
      }
    }

    else if (args[0] == "girl") {
      for (let u of all) {
        if (u.gender == "FEMALE") {
          if (u != event.senderID) data.push(u.id)
        }
      }
    }
    /*for (var idad of listAdmin) {
      api.sendMessage(`⁂➻❥ Spam lệnh pairing từ: ${nameUser}⁂➻❥ \n⁂➻❥ Box Name: ${nameThread} \n Box ID: ${idbox}`,idad, event.threadID, event.messageID)
    }*/
    console.log(nameThread, data)
    if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
    let e = data[Math.floor(Math.random() * data.length)]
    let d = await api.getUserInfo(e);
    let a = (Math.random() * 50) + 50;
    let n = d[e].name
    let b = d[e].gender
    let url = d[e].profileUrl;

    let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, 'utf-8'));
    api.sendMessage({
      body: `Tìm Kiếm Nửa Kia Của Bạn\nTên: ${n}\nGiới Tính: ${(b == 2) ? "Nam" : (b == 1) ? "Nữ" : "Gay"}\nMối Quan Hệ: Độc Thân (có thể)\nĐộ Phù Hợp: ${a.toFixed(2)}%\nInbox: m.me/${e}\nProfile: ${url}`,
      attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
  }

};