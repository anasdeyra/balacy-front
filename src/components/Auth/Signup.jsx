import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { signup, login } from "../../api";
import authContext from "../../contextes/authContext";
import { useContext } from "react";
import AuthPage from "./AuthPage";
import {
  CinInput,
  EmailInput,
  FirstNameInput,
  LastNameInput,
  PasswordInput,
  PhoneNumberInput,
  GenderInput,
} from "./FormInputs";
import { Flex, useToast } from "@chakra-ui/react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    setFocus,
  } = useForm();

  const { setUser } = useContext(authContext);

  const loginQuery = useMutation("login", login, {
    onSuccess: ({ data: { user, token } }) => {
      setUser({ token, ...user });
    },
  });

  const signupQuery = useMutation("signup", signup);
  const toast = useToast();
  function onSubmit(data) {
    const { email, password } = data;
    return new Promise((resolve) => {
      signupQuery.mutate(
        { ...data, type: "Resident" },
        {
          onSuccess: () => {
            loginQuery.mutate({ email, password });
            toast({
              title: `${data.firstName} ${data.lastName}`,
              description: "Account created successfully!",
              status: "success",
              isClosable: true,
              duration: 3000,
              position: "bottom-right",
            });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthPage
        heading={"Create an account"}
        alt={{
          link: "/signin",
          linkText: "Sign In.",
          text: "Already have an account?",
        }}
        buttonText="Sign up"
        submittingText="Signing up"
        isSubmitting={isSubmitting}
      >
        <Flex gap="4">
          <FirstNameInput register={register} err={errors.firstName} />
          <LastNameInput register={register} err={errors.lastName} />
        </Flex>
        <GenderInput register={register} err={errors.gender} />
        <EmailInput register={register} err={errors.email} />
        <PasswordInput register={register} err={errors.password} />
        <CinInput register={register} err={errors.cin} />
        <PhoneNumberInput register={register} err={errors.phoneNumber} />
      </AuthPage>
    </form>
  );
}
