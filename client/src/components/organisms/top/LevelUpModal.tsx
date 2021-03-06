import { memo } from "react";
import { Flex, Text, Image, Box, Stack } from "@chakra-ui/react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { User } from "../../../types/user";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  user: User;
  level: number;
  title: string;
  titleImage: string;
};

export const LevelUpModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClose, isOpen, user, level, title, titleImage } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box p={5}>
        <Box textAlign="center">
          <Text fontSize="25px" color="#d49b33">
            LEVEL UP !!
          </Text>
        </Box>
        <Flex justify="center" textAlign="center" mt={{ base: 3, sm: 6 }}>
          <Flex
            flexDir="column"
            justify="center"
            align="center"
            w="120px"
            fontSize={{ sm: "18px" }}
            mr="10px"
          >
            <Flex justify="space-around">
              <Text>level {level}</Text>
            </Flex>
            <Text mt={3}>{title}</Text>
          </Flex>
          <Flex align="center" justify="center">
            <Image src={titleImage} w={{ base: "130px", sm: "165px" }} />
          </Flex>
        </Flex>
      </Box>
    </PrimaryModal>
  );
});
