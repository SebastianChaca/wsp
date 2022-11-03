import { Box, Flex, Text } from "@chakra-ui/react";
import MessageStatus from "../MessageStatus/MessageStatus";
import { messageUI } from "../../../../types/message/message";

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
}
const ChatMessage = ({ msg, isOutgoing }: Props) => {
  const { message } = msg;

  return (
    <Flex w="100%" justifyContent={isOutgoing ? "right" : "left"}>
      <Box
        padding=" 10px"
        verticalAlign={"top"}
        bg={isOutgoing ? "#7674FE" : "gray.400"}
        color={isOutgoing ? "#ffff" : "#646464"}
        borderRadius={"3px"}
        w="40%"
        my="10px"
      >
        <Text>{message}</Text>
        <MessageStatus
          isOutgoing={isOutgoing}
          date={msg.date}
          seen={msg.seen}
        />
      </Box>
    </Flex>
  );
};

export default ChatMessage;
