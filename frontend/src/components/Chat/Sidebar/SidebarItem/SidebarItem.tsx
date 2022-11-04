import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "../../../Avatar/Avatar";

import LastMessage from "./LastMessage";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  resetNotifications,
  setActiveChat,
} from "../../../../redux/chat/chatSlice";
import { friend } from "../../../../types/session/session";

interface Props {
  friend: friend;
}
const SidebarItem = ({ friend }: Props) => {
  const { name, email, uid, online, lastActive } = friend.user;

  const { activeChat } = useAppSelector((state) => state.chatSlice);

  const selected = activeChat.uid === uid;
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(
      setActiveChat({
        uid,
        name,
        online,
        email,
        isTyping: false,
        lastActive,
      })
    );
    dispatch(resetNotifications({ uid }));
  };
  return (
    //TODO: re hacer este layout
    <Flex
      justifyContent={"center"}
      alignItems="center"
      _hover={{
        bg: selected ? "gray.400" : "gray.300",
      }}
      bg={selected ? "gray.400" : "transparent"}
      onClick={handleClick}
    >
      <Avatar online={online} name={name} hasBadge />
      <Flex
        borderBottom={"1px solid #c4c4c4"}
        cursor="pointer"
        margin={"0px"}
        padding="18px 16px 10px"
        overflow={"hidden"}
        alignItems="start"
        justifyContent={"space-between"}
        w="100%"
      >
        <Box>
          <Text fontSize={"16px"} fontWeight="600">
            {name}
          </Text>
          <LastMessage />
        </Box>

        <Box>
          <Text fontSize={"12px"} fontWeight="600" color={"gray.500"} mt="5px">
            3:18 pm
          </Text>
          {friend.notifications > 0 && (
            <Flex
              bg={"red.600"}
              color={"white"}
              borderRadius={"50%"}
              w="20px"
              h="20px"
              justifyContent={"center"}
              alignItems="center"
              mt="4px"
            >
              <Text fontSize={"10px"} m="uto">
                {friend.notifications}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SidebarItem;
