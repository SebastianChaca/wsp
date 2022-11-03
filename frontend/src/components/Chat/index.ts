import ChatInput from "./ChatInput/ChatInput";
import UserTopBar from "./Sidebar/UserTopBar/UserTopBar";
import ChatTopBar from "./ChatTopBar/ChatTopBar";
import SidebarUserList from "./Sidebar/SidebarUserList/SiebarUserList";
import Messages from "./Messages/Messages";
import EmptyChat from "./EmptyChat/EmptyChat";

export const Chat = {
  Input: ChatInput,
  UserTopBar,
  TopBar: ChatTopBar,
  FriendsList: SidebarUserList,
  Messages,
  EmptyState: EmptyChat,
};
