import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  RadioGroup,
  Stack,
  Radio,
  FormHelperText,
  UnorderedList,
  ListItem,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

export function PasswordInput({ register, err }) {
  const options = {
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long!",
    },
    required: "Password is required!",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="password">Password</FormLabel>

      <Input
        placeholder="Password"
        type={"password"}
        {...register("password", options)}
      ></Input>

      <FormErrorMessage>{err && err.message}</FormErrorMessage>
      <UnorderedList>
        <FormHelperText>
          <ListItem>Password must be at least 6 characters long.</ListItem>
        </FormHelperText>
      </UnorderedList>
    </FormControl>
  );
}

export function EmailInput({ register, err }) {
  re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const options = {
    pattern: { value: re, message: "E-mail invalid!" },
    required: "E-mail is required!",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <Input
        placeholder="E-mail"
        type={"email"}
        {...register("email", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}

export function TypeInput({ register, err }) {
  const options = {
    required: "Type is Required",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="type">Type</FormLabel>
      <RadioGroup defaultValue={"client"}>
        <Stack direction="row">
          <Radio {...register("type", options)} value="client">
            Client
          </Radio>
          <Radio {...register("type", options)} value="developer">
            Developer
          </Radio>
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}

export function UsernameInput({ register, err }) {
  re = /^[a-z]+$/i;
  const options = {
    pattern: { value: re, message: "Username must only be characters only!" },
    required: "Username is required!",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input
        placeholder="Username"
        type={"text"}
        {...register("username", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}

export function FirstNameInput({ register, err }) {
  const options = {
    required: "First name is required!",
    minLength: {
      value: 4,
      message: "First name must be at least 4 chacters long!",
    },
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="firstName">First name</FormLabel>
      <Input
        placeholder="First name"
        type={"text"}
        {...register("firstName", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
      <UnorderedList>
        <FormHelperText>
          <ListItem>
            First and Last names must be at least 4 characters long.
          </ListItem>
        </FormHelperText>
      </UnorderedList>
    </FormControl>
  );
}

export function LastNameInput({ register, err }) {
  const options = {
    required: "Last name is required!",
    minLength: {
      value: 4,
      message: "Last name must be at least 4 chacters long!",
    },
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="lastName">Last name</FormLabel>
      <Input
        placeholder="Last name"
        type={"text"}
        {...register("lastName", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}

export function CinInput({ register, err }) {
  re = /^'[0-9]'$/;
  const options = {
    required: "CIN is required!",
    maxLength: {
      value: 8,
      message: "CIN length must be exactly 8 didgits long!",
    },
    minLength: {
      value: 8,
      message: "CIN length must be exactly 8 didgits long!",
    },
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="cin">CIN</FormLabel>
      <Input
        placeholder="CIN"
        type={"number"}
        {...register("cin", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
      <UnorderedList>
        <FormHelperText>
          <ListItem>CIN must be only in number.</ListItem>
          <ListItem>CIN length must be exactly 8 didgits long.</ListItem>
        </FormHelperText>
      </UnorderedList>
    </FormControl>
  );
}

export function PhoneNumberInput({ register, err }) {
  re = /^'[0-9]'$/;
  const options = {
    required: "Phone number is required!",
    maxLength: {
      value: 8,
      message: "Phone number length must be exactly 8 didgits long!",
    },
    minLength: {
      value: 8,
      message: "Phone number length must be exactly 8 didgits long!",
    },
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
      <InputGroup>
        <InputLeftAddon>+216</InputLeftAddon>
        <Input
          placeholder="Phone number"
          type={"number"}
          {...register("phoneNumber", options)}
        />
      </InputGroup>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
      <UnorderedList>
        <FormHelperText>
          <ListItem>Phone number must be only in number.</ListItem>
          <ListItem>
            Phone number length must be exactly 8 didgits long.
          </ListItem>
        </FormHelperText>
      </UnorderedList>
    </FormControl>
  );
}

export function CodeInput({ register, err }) {
  const options = {
    required: "Code is required!",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="code">Code</FormLabel>
      <Input
        placeholder="Code"
        type={"text"}
        {...register("code", options)}
      ></Input>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}

export function GenderInput({ register, err }) {
  const options = {
    required: "Gender is required!",
  };
  return (
    <FormControl isInvalid={err}>
      <FormLabel htmlFor="gender">Gender</FormLabel>
      <RadioGroup defaultValue={"Male"}>
        <Stack direction="row">
          <Radio {...register("gender", options)} value="Male">
            Male
          </Radio>
          <Radio {...register("gender", options)} value="Female">
            Female
          </Radio>
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{err && err.message}</FormErrorMessage>
    </FormControl>
  );
}
