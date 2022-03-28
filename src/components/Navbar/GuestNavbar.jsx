import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function GuestNavbar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      ></Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box>{children}</Box>
    </Box>
  );
}

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Flex
      position={"sticky"}
      top="0"
      zIndex={"overlay"}
      px={{ base: 4, md: 12 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <Flex
        cursor={"pointer"}
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          BALA
        </Text>
        <Text
          color={`blue.${useColorModeValue("400", "200")}`}
          fontSize="2xl"
          fontWeight="bold"
        >
          CY
        </Text>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={useColorModeValue(<FiMoon />, <FiSun />)}
          onClick={useColorMode().toggleColorMode}
        />
      </HStack>
    </Flex>
  );
};
