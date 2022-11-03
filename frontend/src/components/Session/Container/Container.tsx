import { Container, Stack } from "@chakra-ui/react";
interface Props {
  children: JSX.Element | JSX.Element[];
}
const ContainerBox = ({ children }: Props) => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "4", sm: "8" }}
    >
      <Stack spacing="8">{children}</Stack>
    </Container>
  );
};
export default ContainerBox;
