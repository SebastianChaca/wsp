import { Flex, Text } from "@chakra-ui/react";
import { BsCheckAll } from "react-icons/all";

const LastMessage = () => {
  return (
    <Flex alignItems={"center"} mt="5px">
      <BsCheckAll />
      <Text fontSize={"12px"} ml="5px">
        {" "}
        Ultimo mensaje
      </Text>
    </Flex>
  );
};

export default LastMessage;
