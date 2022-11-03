const ChatUser = require("../models/usuario");
const Message = require("../models/mensaje");
const dayjs = require("dayjs");

const connectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: true };

  await ChatUser.findOneAndUpdate(filter, update);
};

const disconnectUser = async (uid) => {
  const filter = { _id: uid };
  const update = { online: false, lastActive: dayjs() };
  try {
    await ChatUser.findOneAndUpdate(filter, update);
  } catch (error) {
    res.json({
      ok: false,
      msg: "error",
    });
  }
};
const getUsers = async () => {
  const users = await ChatUser.find().sort("-online");

  return users;
  //cambiar el sort para traerlos por ultimos mensajes
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);

    return await message.save();
  } catch (error) {
    return false;
  }
};
const updateSeenMessages = async (messages) => {
  const getMessagesIds = messages.map((msg) => msg.id);

  await Message.updateMany(
    {
      _id: {
        $in: getMessagesIds,
      },
    },
    {
      $set: {
        seen: true,
      },
    }
  );
  const findMessages = await Message.find({ _id: { $in: getMessagesIds } });

  return findMessages;
};
module.exports = {
  disconnectUser,
  connectUser,
  getUsers,
  saveMessage,
  updateSeenMessages,
};
