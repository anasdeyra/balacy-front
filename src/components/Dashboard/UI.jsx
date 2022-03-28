import {
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Center,
  IconButton,
  Icon,
  Input,
  Heading,
  Button,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import AppCard from "./AppCard";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

import { IoMdAdd } from "react-icons/io";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addAppartement, addTrustee, home } from "../../api";
import { useForm } from "react-hook-form";
import {
  FirstNameInput,
  LastNameInput,
  CinInput,
  PhoneNumberInput,
  PasswordInput,
  EmailInput,
  CodeInput,
  GenderInput,
} from "../Auth/FormInputs";
import { useContext } from "react";
import authContext from "../../contextes/authContext";

export function StatCard({ icon, label, value }) {
  return (
    <Flex
      alignItems={"center"}
      justifyItems="center"
      h="full"
      padding={"2"}
      gap="4"
      flexDir={"row"}
    >
      <Center
        borderRadius={"lg"}
        color={`blue.${useColorModeValue("500", "200")}`}
        h="64px"
        w={"64px"}
      >
        <Icon fontSize={"48px"} as={icon} />
      </Center>
      <Flex gap={"2"} flexDir={"column"}>
        <Text
          fontWeight={"semibold"}
          color={`gray.${useColorModeValue("300", "500")}`}
        >
          {label}
        </Text>
        <Text fontWeight={"bold"}>{value}</Text>
      </Flex>
    </Flex>
  );
}

export function AddTrustee() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(authContext);
  const initialRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    setFocus,
  } = useForm();
  const signupQuery = useMutation("addTrustee", addTrustee);
  const toast = useToast();
  const homeQuery = useMutation("home", home);
  function onSubmit(data) {
    return new Promise((resolve) => {
      signupQuery.mutate(
        { ...data, token: user.token },
        {
          onSuccess: () => {
            toast({
              title: `${data.firstName} ${data.lastName}`,
              description: "Account created successfully!",
              status: "success",
              isClosable: true,
              duration: 3000,
              position: "bottom-right",
            });
            onClose();
            homeQuery.mutate(user.token);
            queryClient.invalidateQueries();
          },
          onError: ({
            response: {
              data: { data },
              status,
            },
          }) => {
            if (status !== 422) return;
            data.forEach(({ msg, param }, i) => {
              setError(param, { type: "server", message: msg });
              i === 0 && setFocus(param);
            });
          },
          onSettled: () => {
            resolve();
          },
        }
      );
    });
  }

  return (
    <Flex alignItems={"center"} m="4">
      <Button onClick={onOpen}>Add trustee</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a trustee account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <CodeInput register={register} err={errors.code} />
              <Flex gap="4">
                <FirstNameInput register={register} err={errors.firstName} />
                <LastNameInput register={register} err={errors.lastName} />
              </Flex>
              <GenderInput register={register} err={errors.gender} />
              <EmailInput register={register} err={errors.email} />
              <PasswordInput register={register} err={errors.password} />
              <CinInput register={register} err={errors.cin} />
              <PhoneNumberInput register={register} err={errors.phoneNumber} />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
              loadingText="Creating"
              isLoading={isSubmitting}
              mr={3}
            >
              Create
            </Button>
            <Button colorScheme={"red"} variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export function AddResidence() {
  const [code, setCode] = useState();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user, setUser } = useContext(authContext);

  const homeQuery = useMutation("home", home);

  const mutation = useMutation("addAppartement", addAppartement, {
    onSuccess: () => {
      homeQuery.mutate(user.token);
    },
    onError: () => {
      toast({
        duration: 3000,
        position: "bottom-right",
        title: "Appartement already exists",
        isClosable: true,
        status: "error",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const {
    user: { token, cin },
  } = useContext(authContext);

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    mutation.mutate({ code, token, cin });
  }

  return (
    <Flex gap="4" flexDir={"column"} w="full" justifyContent={"center"} m="4">
      <Heading fontSize={"2xl"}>Add an appartement</Heading>
      <form style={{ width: "100%" }} onSubmit={onSubmit}>
        <Flex w="full" alignContent={"center"} gap="4" flexDir={"row"}>
          <Input
            variant={"filled"}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder="Put your code here"
          />
          <IconButton
            isLoading={isLoading}
            type="submit"
            icon={<Icon as={IoMdAdd} />}
          />
        </Flex>
      </form>
    </Flex>
  );
}

const appsData = [
  {
    address: "49214 Bluejay Trail",
    image: `${process.env.SERVER_URL}/images/app1.jpg`,
  },
];

export function AppsRanking() {
  return (
    <Flex flexDir={"column"} p="2">
      <AppCard />
    </Flex>
  );
}
