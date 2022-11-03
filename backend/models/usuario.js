const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: null,
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "ChatUser",
      },
      notifications: {
        type: Number,
        default: 0,
      },
      lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "ChatMessage",
      },
      status: {
        type: Number,

        enums: [
          0, //'requested',
          1, //'accepted',
          3, //blocked
        ],
      },
    },
  ],
});

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});
UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "friends",
    populate: {
      path: "user",
      select: ["name", "email", "online", "-friends", "lastActive"],
    },
  });
  next();
});
module.exports = model("ChatUser", UserSchema);
