import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
interface Props {
  children: JSX.Element | JSX.Element[];
}
const FormContainer = ({ children }: Props) => {
  return (
    <Box
      py={{ base: "4", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={"white"}
      boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
      borderRadius={{ base: "xl", sm: "xl" }}
    >
      <Stack spacing="6">
        <Stack spacing="5">{children}</Stack>
      </Stack>
    </Box>
  );
};

export default FormContainer;
