import React from "react";
import { Box } from "@chakra-ui/react";
interface Props {
  children?: JSX.Element | JSX.Element[];
}
const LeftContainer = ({ children }: Props) => {
  return (
    <Box overflow={"hidden"} borderRight={"1px solid #c4c4c4"} margin="0px">
      {children}
    </Box>
  );
};

export default LeftContainer;
