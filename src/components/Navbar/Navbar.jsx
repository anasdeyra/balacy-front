import { useContext, useEffect } from "react";
import authContext from "../../contextes/authContext";
import {
  chakra,
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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { refreshUserInfo } from "../../api";

const LinkItems = [
  { name: "Dashboard", icon: FiHome },
  { name: "Statistics", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function Navbar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
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
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          onClick={() => {
            navigate(`/${link.name}`, { replace: true });
          }}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ name, icon, children, ...rest }) => {
  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: `blue.400`,
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(authContext);
  const userInfoQuery = useMutation("refreshUserInfo", refreshUserInfo, {
    onSuccess: ({ data }) => {
      setUser({ ...data.user, token: user.token });
    },
  });
  useEffect(() => {
    userInfoQuery.mutate(user?.token);
  }, []);
  return (
    <Flex
      position={"sticky"}
      top="0"
      zIndex={"overlay"}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex
        display={{ base: "flex", md: "none" }}
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

        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={
            <>
              <chakra.span
                pos="absolute"
                top="32%"
                right="28%"
                p="4px"
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              />
              <FiBell />
            </>
          }
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  src={`https://avatars.dicebear.com/api/${user?.gender?.toLowerCase()}/${
                    user?.firstName
                  }${user?.lastName}.svg`}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{`${user?.firstName} ${user?.lastName}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.type}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={logout}
                color={`red.${useColorModeValue("400", "200")}`}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
