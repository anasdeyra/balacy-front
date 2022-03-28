import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../../api";
import authContext from "../../contextes/authContext";
import { useContext } from "react";
import AuthPage from "./AuthPage";
import { EmailInput, PasswordInput } from "./FormInputs";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    setFocus,
  } = useForm({ mode: "onTouched" });

  const { setUser } = useContext(authContext);

  const loginQuery = useMutation("login", login, {
    onSuccess: ({ data: { user, token } }) => {
      setUser({ token, ...user });
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
  });

  function onSubmit(data) {
    return new Promise((resolve) => {
      loginQuery.mutate(data, {
        onSettled: () => {
          resolve();
        },
      });
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthPage
        heading={"Sign in to your account"}
        alt={{
          link: "/signup",
          linkText: "Sign up.",
          text: "Dont have an account?",
        }}
        buttonText="Sign in"
        submittingText="Signing in"
        isSubmitting={isSubmitting}
      >
        <EmailInput register={register} err={errors.email} />
        <PasswordInput register={register} err={errors.password} />
      </AuthPage>
    </form>
  );
}
