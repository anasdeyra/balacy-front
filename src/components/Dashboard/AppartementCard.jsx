import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { rent } from "../../api";
import { useContext } from "react";
import authContext from "../../contextes/authContext";

export default function AppartementCard({ image = "", address, price, id }) {
  const { user } = useContext(authContext);
  const rentQuery = useMutation("rent", rent);
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"start"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Appartement
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {address}
          </Heading>
          <Stack w="full" direction={"row"} align={"center"}>
            <Text fontWeight={"black"} fontSize={"xl"}>
              {price} TND
            </Text>
            <Spacer />
            <Button
              onClick={() => {
                rentQuery.mutate({ token: user.token, appId: id });
              }}
            >
              Rent
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
