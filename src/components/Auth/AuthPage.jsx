import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as LinkTo } from "react-router-dom";
import image from "../../assets/images/authBanner.jpg";

export default function AuthPage({
  heading,
  children,
  isSubmitting,
  submittingText,
  buttonText,
  alt,
}) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} pt="0" flex={1} align={"center"} justify={"center"}>
        <Stack mt="4" spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"3xl"}>{heading}</Heading>
          {children}
          <Stack spacing={6}>
            <Stack align={"start"}>
              <Text color={`${useColorModeValue("gray.400", "gray.600")}`}>
                {alt?.text}{" "}
                <Link
                  as={LinkTo}
                  to={alt?.link}
                  color={`blue.${useColorModeValue("400", "600")}`}
                >
                  {alt?.linkText}
                </Link>
              </Text>
            </Stack>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText={submittingText}
              variant={"solid"}
              bg={`blue.${useColorModeValue("400", "500")}`}
              color="white"
              _hover={{ bg: `blue.${useColorModeValue("500", "400")}` }}
            >
              {buttonText}
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={image} />
      </Flex>
    </Stack>
  );
}
