import { MenuItem } from "@chakra-ui/react";
interface Props {
  onOpen(): void;
}
const AddFriend = ({ onOpen }: Props) => {
  return (
    <>
      <MenuItem onClick={onOpen}>AddFriend</MenuItem>
    </>
  );
};

export default AddFriend;
