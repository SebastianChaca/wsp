import React from "react";
import { useField } from "formik";
import {
  FormLabel,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ErrorMessage as Errormsg } from "formik";
interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  [x: string]: any;
}
type Ref = HTMLInputElement;

const FormikInput = React.forwardRef<Ref, Props>(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isPassword = props.name === "password";
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <FormLabel mt={"10px"}>{label}</FormLabel>
      <InputGroup>
        {props.name === "password" && (
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        )}
        <Input
          {...field}
          {...props}
          isInvalid={!!meta.touched && !!meta.error}
          ref={isPassword ? inputRef : ref}
          type={isPassword && !isOpen ? "password" : props.type}
        />
      </InputGroup>

      <Errormsg name={props.name} component={ErrorMessage} />
    </>
  );
});

export default FormikInput;
