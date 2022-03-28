import { Heading, Flex } from "@chakra-ui/react";
import Chart from "./Chart";
import faker from "@faker-js/faker";
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aughust",
  "September",
  "October",
  "Novemeber",
  "December",
];
export const data = {
  labels,
  datasets: [
    {
      label: "Monthly revenue",
      data: labels.map(() => faker.datatype.number({ min: 12000, max: 70000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Statistics() {
  return (
    <Flex flexDir="column" gap="4" m="4">
      <Heading>Monthly Revenue</Heading>
      <Chart data={data} />
    </Flex>
  );
}
