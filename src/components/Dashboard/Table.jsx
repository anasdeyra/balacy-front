import React, { useState, useContext, useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Heading,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { home } from "../../api";
import authContext from "../../contextes/authContext";

export default function Table() {
  const { user, setUser } = useContext(authContext);
  const [trustees, setTrustees] = useState([]);
  const header = ["name", "Email", "Actions"];

  const homeQuery = useMutation("home", home);
  useEffect(() => {
    homeQuery.mutate(user.token, {
      onSuccess: ({ data: { syndics } }) => {
        var ar = [];
        syndics.map((syndic) => {
          ar.push({
            name: `${syndic.firstName} ${syndic.lastName}`,
            email: syndic.email,
          });
        });

        setTrustees(ar);
      },
    });
  }, []);

  const data = [
    { name: "manoubeya", created: "7 hay zouhour" },
    { name: "Anubra", created: "23 hours ago" },
    { name: "Josef", created: "A few seconds ago" },
    { name: "Sage", created: "A few hours ago" },
  ];
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  return (
    <Flex
      gap="8"
      flexDir={"column"}
      w="full"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize={"2xl"}>Manage your trustees</Heading>
      <Table
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {trustees.map((token, tid) => {
            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                {Object.keys(token).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: color1,
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        color={"gray.500"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {token[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: color2,
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton colorScheme="green" icon={<AiFillEdit />} />
                    <IconButton
                      variant="outline"
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                    />

                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
