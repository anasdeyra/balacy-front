import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { AddResidence, AddTrustee, StatCard, AppsRanking } from "./UI";
import { BiBuilding } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import Table from "./Table";
import { home } from "../../api";
import { useMutation } from "react-query";
import { useContext, useEffect } from "react";
import authContext from "../../contextes/authContext";

export default function Dashboard() {
  const { user, setUser } = useContext(authContext);

  const homeQuery = useMutation("home", home);
  useEffect(() => {
    homeQuery.mutate(user.token);
  }, []);

  return (
    <Grid
      minH="500px"
      templateRows={{ base: "repeat(6, 1fr)", md: "repeat(6, 1fr)" }}
      templateColumns={{
        base: "repeat(3, 1fr)",
        md: "repeat(6, 1fr)",
        lg: "repeat(8, 1fr)",
      }}
      gap={4}
    >
      <GridItem
        overflow={"hidden"}
        colSpan={{ base: 1, md: 2 }}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <StatCard
          icon={BiBuilding}
          label={"Appartements"}
          value={homeQuery.data?.data?.numApps}
        />
      </GridItem>
      <GridItem
        overflow={"hidden"}
        colSpan={{ base: 1, md: 2 }}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <StatCard
          icon={BsFillPeopleFill}
          label={"Residents"}
          value={homeQuery.data?.data?.numResidents}
        />
      </GridItem>
      <GridItem
        overflow={"hidden"}
        colSpan={{ base: 1, md: 2 }}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <StatCard
          icon={MdOutlineAttachMoney}
          label={"Revenue"}
          value={"36K TND"}
        />
      </GridItem>
      <GridItem
        borderRadius={"xl"}
        colSpan={2}
        rowSpan={6}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
        display={{ base: "none", lg: "block" }}
      >
        <AppsRanking />
      </GridItem>
      <GridItem
        display={"flex"}
        colSpan={3}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <AddResidence />
      </GridItem>
      <GridItem
        colSpan={3}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
        display="flex"
        justifyContent={"center"}
        alignContent={"center"}
      >
        <AddTrustee />
      </GridItem>
      <GridItem
        colSpan={6}
        rowSpan={6}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Table />
      </GridItem>
    </Grid>
  );
}
