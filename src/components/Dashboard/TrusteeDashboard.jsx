import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { StatCard, AppsRanking } from "./UI";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { response, syndicHome, syndicRequest } from "../../api";
import { useMutation } from "react-query";
import { useContext, useEffect, useState } from "react";
import authContext from "../../contextes/authContext";
import { HiLocationMarker } from "react-icons/hi";
import ManageCard from "./ManageCard";
import UsersRequests from "./UsersRequests";

export default function Dashboard() {
  const { user, setUser } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const requestQuery = useMutation("syndicRequest", syndicRequest);
  const homeQuery = useMutation("syndicHome", syndicHome);

  useEffect(() => {
    homeQuery.mutate(user.token);
    requestQuery.mutate(user.token, {
      onSuccess: ({ data }) => {
        setRequests(data.requests);
      },
    });
  }, []);

  return (
    <Grid
      minH="500px"
      templateRows={{ base: "repeat(4, 1fr)", md: "repeat(4, 1fr)" }}
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
          icon={HiLocationMarker}
          label={"Location"}
          value={homeQuery.data?.data?.appartement?.adresse}
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
          value={homeQuery.data?.data?.appartement?.residences?.length}
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
          label={"Tresor"}
          value={"700 TND"}
        />
      </GridItem>
      <GridItem
        borderRadius={"xl"}
        colSpan={2}
        rowSpan={4}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
        display={{ base: "none", lg: "block" }}
      >
        <UsersRequests requests={requests} />
      </GridItem>

      <GridItem
        colSpan={6}
        rowSpan={3}
        borderRadius={"xl"}
        boxShadow={"md"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <ManageCard levels={homeQuery.data?.data?.appartement?.levels} />
      </GridItem>
    </Grid>
  );
}
