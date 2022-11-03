import { Box } from "@chakra-ui/react";

import SidebarItem from "../SidebarItem/SidebarItem";
import { useAppSelector } from "../../../../redux/hooks";

const SidebarUserList = () => {
  const { friends } = useAppSelector((state) => state.chatSlice);
  if (!friends) {
    return <h1>Users</h1>;
  }

  return (
    <Box
      height={"100vh"}
      overflow="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "10px",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.15)`,
          borderRadius: "8px",
        },
      }}
    >
      {friends?.map((friend) => {
        return <SidebarItem key={friend._id} friend={friend} />;
      })}
    </Box>
  );
};

export default SidebarUserList;
