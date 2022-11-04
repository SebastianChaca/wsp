import { useEffect } from "react";
import { useSocketContext } from "../SocketContext/SocketContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFriendsList } from "../../redux/chat/chatSlice";
import { friend } from "../../types/session/session";
interface Props {
  children?: JSX.Element | JSX.Element[];
}
const SidebarEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.sessionSlice);

  //lista de amigos
  useEffect(() => {
    socket?.on("friend-list", (friends: friend[]) => {
      console.log(friends);
      dispatch(setFriendsList(friends));
    });
  }, [socket, dispatch, uid]);

  useEffect(() => {
    socket?.on("friend-status", (friend) => {
      //TODO: dispatch de update de estado de user
      console.log(friend);
    });
  }, [socket]);

  return <>{children}</>;
};

export default SidebarEvents;
