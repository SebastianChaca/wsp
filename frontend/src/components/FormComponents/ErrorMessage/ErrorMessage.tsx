import { Text } from "@chakra-ui/react";
interface Props {
  children?: string;
}
const ErrorMessage = ({ children }: Props) => {
  return (
    <Text color="red.600" fontSize={"14px"} mt="4px">
      {children}
    </Text>
  );
};

export default ErrorMessage;
