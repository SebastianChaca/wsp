import {
  LeftContainer,
  RightContainer,
} from "../../components/AppLayoutContainers";
import { Chat } from "../../components/Chat";
import { Grid } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { getMessages } from "../../services/messages/getMessages";

const ChatPage = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const activeChatSelected = activeChat.uid;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeChatSelected) {
      dispatch(getMessages(activeChatSelected));
    }
  }, [activeChatSelected, dispatch]);

  return (
    <Grid templateColumns={"30% 70%"} height={"100vh"} overflow="hidden">
      <LeftContainer>
        {/* 
        <LeftUtilitySidebar/>
        */}
        <Chat.UserTopBar />
        <Chat.FriendsList />
      </LeftContainer>

      <RightContainer>
        {activeChatSelected ? (
          <>
            <Chat.TopBar />
            <Chat.Messages />
            <Chat.Input />
          </>
        ) : (
          <Chat.EmptyState />
        )}
        {/* 
        <RightUtilitySidebar/>
        */}
      </RightContainer>
    </Grid>
  );
};

export default ChatPage;
