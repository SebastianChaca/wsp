import { Flex, Text } from "@chakra-ui/react";
import { BsCheckAll } from "react-icons/all";
import { getHour } from "../../../../utils/date";
interface Props {
  isOutgoing: boolean;
  date: string;
  seen: boolean;
}
const MessageStatus = ({ isOutgoing, date, seen }: Props) => {
  return (
    <Flex justifyContent={"right"}>
      <Text fontSize={"10px"} mr="4px">
        {getHour(date)}
      </Text>
      {isOutgoing && <BsCheckAll color={seen ? "blue" : "white"} />}
    </Flex>
  );
};

export default MessageStatus;
