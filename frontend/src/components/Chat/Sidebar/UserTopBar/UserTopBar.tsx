import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../../../redux/hooks";

import Avatar from "../../../Avatar/Avatar";
import UserTopBarMenu from "./Menu/UserTopBarMenu";

const UserTopBar = () => {
  const { name } = useAppSelector((state) => state.sessionSlice);

  return (
    <Flex
      overflow={"hidden"}
      p="10px"
      borderBottom={"1px solid #c4c4c4"}
      h="80px"
      justifyContent={"left"}
      alignItems="center"
    >
      <Avatar name={name} />
      <UserTopBarMenu />
    </Flex>
  );
};

export default UserTopBar;
