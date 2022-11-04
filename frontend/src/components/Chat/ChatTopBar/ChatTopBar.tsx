import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "../../Avatar/Avatar";
import { useAppSelector } from "../../../redux/hooks";
import { getLastActive } from "../../../utils/date";
const ChatTopBar = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { name, online, isTyping, lastActive } = activeChat;

  return (
    <Flex
      borderBottom={"1px solid #c4c4c4"}
      margin={"0px"}
      padding="18px 16px 10px"
      alignItems="start"
      justifyContent={"space-between"}
      h={"80px"}
      position={"absolute"}
      top={0}
      w="100%"
      bg="#E2E8F0"
    >
      <Flex alignItems={"start"} justifyContent="left">
        <Avatar online={online} name={name} hasBadge />
        <Box mt="2px">
          <Text fontSize={"18px"} fontWeight="600">
            {name}
          </Text>
          {online && !isTyping && <Text fontSize={"12px"}>En linea</Text>}
          {!online && lastActive && (
            <Text fontSize={"12px"}>{getLastActive(lastActive)}</Text>
          )}
          {isTyping && <Text fontSize={"12px"}>Escribiendo...</Text>}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatTopBar;
