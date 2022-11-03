import { Box } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage/ChatMessage";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useRef } from "react";
const Messages = () => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  return (
    <Box
      h={"100%"}
      overflow="auto"
      padding=" 30px 15px 90px 25px"
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.15)`,
          borderRadius: "8px",
        },
      }}
    >
      {messages.map((msg) => (
        <ChatMessage msg={msg} key={msg.id} isOutgoing={msg.from === uid} />
      ))}

      <div ref={ref} />
    </Box>
  );
};

export default Messages;
