import React from "react";
import { MenuItem } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { signOut } from "../../../../../../redux/session/sessionSlice";

const Singout = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return <MenuItem onClick={handleSignOut}>Singout</MenuItem>;
};

export default Singout;
