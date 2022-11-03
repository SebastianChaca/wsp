import React from "react";
import { AvatarBadge, Avatar as Avt } from "@chakra-ui/react";
interface Props {
  online?: boolean;
  name: string;
  hasBadge?: boolean;
}
const Avatar = ({ online, name, hasBadge }: Props) => {
  return (
    <Avt name={name} size={"md"} mx="10px">
      {hasBadge && (
        <AvatarBadge boxSize={"20px"} bg={online ? "green.500" : "red.500"} />
      )}
    </Avt>
  );
};

export default Avatar;
