import { useEffect } from "react";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";

import { useAppSelector } from "../../redux/hooks";
interface socketCont {
  socket: Socket | null;
  online: boolean;
}
const SocketContext = createContext<socketCont>({} as socketCont);
interface Props {
  children?: JSX.Element | JSX.Element[];
}
const SocketProvider = ({ children }: Props) => {
  const { conectarSocket, desconectarSocket, socket, online } = useSocket();

  const { token } = useAppSelector((state) => state.sessionSlice);

  useEffect(() => {
    if (token) {
      conectarSocket(token);
    }
  }, [token, conectarSocket]);

  useEffect(() => {
    if (!token) {
      desconectarSocket();
    }
  }, [token, desconectarSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
export const useSocketContext = () => useContext(SocketContext);
