import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRef, useEffect, useState } from "react";
import * as Yup from "yup";
import { FormikInput } from "../../../../../FormComponents";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { addFriendd } from "../../../../../../services/friends/addFriends";
import {
  addFierndToList,
  setActiveChat,
} from "../../../../../../redux/chat/chatSlice";

interface Props {
  isOpen: boolean;
  onClose(): void;
}
const AddFriendModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.focus({ preventScroll: true });
    }
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={ref}>
      <ModalOverlay />
      <ModalContent w="700px" p="20px">
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            validateOnMount={false}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                setIsloading(true);
                setError(null);
                const friend = await addFriendd({ email: values.email });
                const { name, email, uid, online, lastActive } = friend.user;
                dispatch(addFierndToList(friend));
                onClose();
                //TODO: cuando seteo el active chat no me hace focus en el input
                dispatch(
                  setActiveChat({
                    uid,
                    name,
                    online,
                    email,
                    isTyping: false,
                    lastActive,
                  })
                );
              } catch (error) {
                setError(JSON.stringify(error));
              } finally {
                setIsloading(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <FormikInput name="email" type="text" label="Email" ref={ref} />

                <Button
                  bg={"#692b8f"}
                  color="white"
                  type="submit"
                  w={"100%"}
                  mt="20px"
                  //TODO: cuando tengo un solo input funciona mal la validacion
                  disabled={!props.isValid}
                  isLoading={isLoading}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
          {error && error}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
