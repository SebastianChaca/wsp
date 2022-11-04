const {
  connectUser,
  disconnectUser,
  getUsers,
  saveMessage,
  updateSeenMessages,
} = require("../constrollers/sockets");
const { getFriends, addFriend } = require("../constrollers/friends");
const { checkJWT } = require("../middlewares/validar-jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      console.log("cliente conectado");
      //valido el token
      const [valid, uid] = checkJWT(socket.handshake.query["x-token"]);

      if (!valid) {
        return socket.disconnect();
      }
      // actualizo la db en el campo online
      await connectUser(uid);
      socket.join(uid);

      //emitir a todos los usuarios conectados
      this.io.to(uid).emit("friend-list", await getFriends(uid));

      //agregar a mi lista de amigos
      // socket.on("add-friend", async (email) => {
      //   this.io.to(uid).emit("add-friend", await addFriend(uid, email));
      // });
      //escuchar si estan escribiendo
      socket.on("typing", (payload) => {
        if (payload.message.length > 0) {
          this.io.to(payload.to).emit("typing", payload);
        } else {
          this.io.to(payload.to).emit("typing", false);
        }
      });

      //marcar mensajes como vistos
      socket.on("seen-messages", async (payload) => {
        const updateMessages = await updateSeenMessages(payload);
        //mandar ultimo mensaje
        // marcar mensajes como vistos y mandarlos al front
        this.io.to(payload[0].from).emit("seen-messages", updateMessages);
      });

      // obtener mensaje personal
      socket.on("personal-message", async (payload) => {
        const message = await saveMessage(payload);

        //emito mensaje al destinatario
        this.io.to(payload.to).emit("personal-message", message);
        //TODO: puedo hacer esto en la UI para evitar otra request
        this.io.to(payload.from).emit("personal-message", message);
      });

      socket.on("disconnect", async () => {
        console.log("desconectado");
        // actualizo la db en el campo online
        await disconnectUser(uid);
        //emitir a todos los usuarios conectados
        //TODO: emitir a todos los amigos
        this.io.to(uid).emit("user-list", await getFriends(uid));
      });
    });
  }
}

module.exports = Sockets;
