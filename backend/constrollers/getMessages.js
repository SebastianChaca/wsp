const ChatMessage = require("../models/mensaje");
const getMessages = async (req, res) => {
  const myId = req.uid;
  const messageFrom = req.params.from;

  const last30 = await ChatMessage.find({
    $or: [
      { from: myId, to: messageFrom },
      { from: messageFrom, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  ///test

  res.json({
    ok: true,
    mensajes: last30,
  });
};

module.exports = { getMessages };
