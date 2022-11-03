import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/all";
import { AddFriend, AddFriendModal, Signout } from "./MenuItems";
const UserTopBarMenu = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<FiChevronDown fontSize={"24px"} />}
          variant="outline"
        />

        <MenuList>
          <AddFriend onOpen={onOpen} />
          <Signout />
        </MenuList>
      </Menu>
    </>
  );
};

export default UserTopBarMenu;
