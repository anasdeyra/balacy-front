import {
  Spacer,
  Avatar,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdClose, MdCheck } from "react-icons/md";
import { useMutation } from "react-query";
import { useContext } from "react";
import authContext from "../../contextes/authContext";
import { response } from "../../api";

export default function UsersRequests({ requests = [] }) {
  return (
    <Flex flexDir={"column"} m={4}>
      <Heading fontSize={"xl"}>Users requests</Heading>
      <Flex mt="4" flexDir={"column"} gap="4">
        {requests.map(({ ResidentId, _id }, i) => {
          return (
            <UserCard
              key={i}
              firstName={"you have a request"}
              lastName=""
              gender={"male"}
              ResidentId={ResidentId}
              id={_id}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

function UserCard({ firstName, lastName, gender, ResidentId, id }) {
  const responseQuery = useMutation("response", response);
  const { user } = useContext(authContext);
  function refuse() {
    responseQuery.mutate({
      token: user.token,
      request: "delete",
      residentId: ResidentId,
      requestId: id,
    });
  }
  function accept() {
    responseQuery.mutate({
      token: user.token,
      request: "su",
      residentId: ResidentId,
      requestId: id,
    });
  }

  return (
    <HStack gap={"2"} p="2" boxShadow={"md"} borderRadius="lg">
      <Avatar
        size={"sm"}
        src={`https://avatars.dicebear.com/api/${gender?.toLowerCase()}/${firstName}${lastName}.svg`}
      />
      <Text>{`${firstName} ${lastName}`}</Text>
      <Spacer />
      <Flex gap="2">
        <IconButton
          onClick={() => {
            refuse();
          }}
          fontSize={"xl"}
          size={"xs"}
          icon={<MdClose />}
          colorScheme={"red"}
        />
        <IconButton
          onClick={() => {
            accept();
          }}
          fontSize={"xl"}
          size={"xs"}
          icon={<MdCheck />}
          colorScheme={"green"}
        />
      </Flex>
    </HStack>
  );
}
