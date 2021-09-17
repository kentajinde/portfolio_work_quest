import { memo } from "react";
import { Image, Box, Text } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { PrimaryContainer } from "../atoms/PrimaryContainer";
import book from "../../image/report.png";
import { BarChart } from "../molcules/BarChart";
import { LineChart } from "../molcules/LineChart";
import { PieChart } from "../molcules/PieChart";

export const Report = memo(() => {
  const value = [12, 1, 3];
  const workRate = [12, 42, 48];

  return (
    <>
      <SecondaryLayout>
        <PrimaryWrapper>
          <Box position="relative">
            <Image src={book} boxSize="120px" mx="auto" />
            <Box
              position="absolute"
              w={0}
              top="60px"
              left={0}
              right={0}
              mx="auto"
              border="32px solid transparent"
              borderBottomColor="#171923"
              zIndex={2}
            ></Box>
            <Box
              position="absolute"
              w={0}
              top="48px"
              left={0}
              right={0}
              mx="auto"
              border="38px solid transparent"
              borderBottomColor="white"
              zIndex={1}
            ></Box>
            <PrimaryContainer>
              <Box p={5}>
                <Box>
                  <Text mb={2}>今日の戦績</Text>
                  <Box border="1px solid white" py={3} px={5}>
                    <BarChart value={value} />
                  </Box>
                </Box>
              </Box>
              <Box p={5}>
                <Box>
                  <Text mb={2}>一週間の戦績</Text>
                  <Box border="1px solid white" py={3} px={5}>
                    <LineChart value={value} />
                  </Box>
                </Box>
              </Box>
              <Box p={5}>
                <Box>
                  <Text mb={2}>Workの内訳</Text>
                  <Box border="1px solid white" py={3} px={3}>
                    <PieChart value={workRate} />
                  </Box>
                </Box>
              </Box>
            </PrimaryContainer>
          </Box>
        </PrimaryWrapper>
      </SecondaryLayout>
    </>
  );
});