import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useEffect, useContext, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import AppartementCard from "./AppartementCard";
import authContext from "../../contextes/authContext";
import { residentHome, syndicRequest } from "../../api";

function SearchBar() {
  return (
    <Stack w="80%" spacing={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<HiOutlineSearch color="gray.300" />}
        />
        <Input
          bg={useColorModeValue("gray.200")}
          variant={"filled"}
          type="text"
          placeholder="Search an appartement"
        />
      </InputGroup>
    </Stack>
  );
}
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function ResidentDashboard() {
  const { user } = useContext(authContext);
  const [apps, setApps] = useState([]);

  const residentQuery = useMutation("residentHome", residentHome);

  useEffect(() => {
    residentQuery.mutate(user.token, {
      onSuccess: ({ data }) => {
        setApps(data);
      },
    });
  }, []);

  return (
    <VStack spacing={4}>
      <SearchBar />
      <SimpleGrid gap="8" columns={{ base: 1, md: 2 }}>
        {apps.map(({ adresse, image, _id }, i) => {
          return (
            <AppartementCard
              address={adresse}
              image={`${process.env.SERVER_URL + image}`}
              price={getRandomArbitrary(300, 4000)}
              id={_id}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}
