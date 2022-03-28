import {
  Box,
  GridItem,
  SimpleGrid,
  Icon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";

function HouseCard({ price, numRooms }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Flex
      justifyContent={"center"}
      p="4"
      borderRadius={"xl"}
      boxShadow={"md"}
      width="min-content"
    >
      <Icon
        onClick={onOpen}
        cursor={"pointer"}
        fontSize={"32px"}
        as={AiFillHome}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{price}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
export default function ManageCard({ levels }) {
  return (
    <SimpleGrid columns={2} p="4" gap="4">
      {levels &&
        levels.map((level, i) => {
          return (
            <GridItem
              boxShadow={"md"}
              p="4"
              flexDir={"column"}
              as={Flex}
              key={i}
              borderRadius={"md"}
              gap="4"
            >
              <Heading fontSize={"xl"}>Floor: {i}</Heading>
              <SimpleGrid
                columns={2}
                autoFlow={"row"}
                gap="4"
                justifyItems="center"
              >
                {level.map(({ price, numRooms }, j) => {
                  return (
                    <HouseCard key={j} price={price} numRooms={numRooms} />
                  );
                })}
              </SimpleGrid>
            </GridItem>
          );
        })}
    </SimpleGrid>
  );
}
