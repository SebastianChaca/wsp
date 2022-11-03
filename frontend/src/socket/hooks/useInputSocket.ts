import { useAppSelector } from "../../redux/hooks";
import { useSocketContext } from "../SocketContext/SocketContext";
import { useCallback, useMemo } from "react";
import { messageToServer } from "../../types/message/message";
const useInputSocket = (message: string) => {
  const { activeChat, messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const { socket } = useSocketContext();

  const msg: messageToServer = useMemo(() => {
    return {
      from: uid,
      to: activeChat.uid,
      message,
    };
  }, [message, uid, activeChat.uid]);
  const setTypingEvent = useCallback(() => {
    if (message) {
      socket?.emit("typing", msg);
    } else {
      socket?.emit("typing", msg);
    }
  }, [message, msg, socket]);

  const submitEvent = useCallback(() => {
    socket?.emit("personal-message", msg);
  }, [socket, msg]);

  const seenEvent = useCallback(() => {
    //filtrar los mensajes que me mandaron y que seen === false y mandarlos al back
    const notSeenMessages = messages.filter(
      (msg) => msg.to === uid && !msg.seen
    );

    if (notSeenMessages.length > 0) {
      socket?.emit("seen-messages", notSeenMessages);
    }
  }, [messages, socket, uid]);
  return { setTypingEvent, submitEvent, seenEvent };
};

export default useInputSocket;
