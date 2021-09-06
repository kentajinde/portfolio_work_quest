import { memo } from "react";
import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  Image,
  Progress,
  Button,
} from "@chakra-ui/react";
import party from "party-js";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { TotalTime } from "../molcules/TotalTime";
import { User } from "../../types/user";
import { Comment } from "../molcules/Comment";
import { useDisclosureLevelUp } from "../../hooks/useDisclosureLevelUp";
import { users } from "../../assets/data/users";
import { LevelUpModal } from "./LevelUpModal";
import praise from "../../assets/audio/praise.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";

type Props = {
  user: User;
  titleImage: string;
  myProfile?: boolean;
  experienceRate?: number;
  level?: number;
  title?: string;
  flag?: boolean;
  onClickLevelUp?: (props: any) => void;
};

type DefaultProps = {
  experienceRate: number;
  onClickLevelUp: (props: any) => void;
};

type PropsWithDefault = Props & DefaultProps;

export const Status = memo((props: Props) => {
  const {
    user,
    titleImage,
    myProfile = false,
    experienceRate,
    level,
    title,
    flag = false,
    onClickLevelUp,
  } = props as PropsWithDefault;
  const colorScheme = experienceRate >= 100 ? "pink" : "blue";
  const progressDisplay = myProfile ? "auto" : "none";
  const commentDisplay = myProfile ? "none" : "auto";
  const levelUpDisplay = flag ? "auto" : "none";
  const profileLevel = myProfile ? level : user.level;
  const profileTitle = myProfile ? title : user.title;

  const { isOpenLevelUp, onCloseLevelUp, onOpenLevelUp } =
    useDisclosureLevelUp();
  const [soundPraise, onClickPraise] = useSoundEffect(praise);

  const onClickParty = () => {
    setTimeout(() => {
      party.confetti(document.body, {
        count: party.variation.range(30, 30),
      });
    }, 200);
  };

  return (
    <PrimaryContainer>
      <Flex
        py={{ base: "40px", md: "70px" }}
        px={{ base: 4, md: 8 }}
        color="white"
        align="center"
        justify="space-around"
      >
        <Box w="50%">
          <Box mb={6}>
            <TotalTime totalTime={user.total_time} fontSize="18px" />
          </Box>
          <Box mb={8}>
            <Heading fontSize="18px" fontFamily="inherit">
              {user.user_name}
            </Heading>
          </Box>
          <Stack spacing={5}>
            <Box>
              <Flex align="center">
                <Text fontSize="15px">Level</Text>
                <Text ml={5} fontWeight="bold">
                  {profileLevel}
                </Text>
              </Flex>
              <Progress
                d={progressDisplay}
                value={experienceRate}
                colorScheme={colorScheme}
                size="sm"
                w="100px"
                mt={2}
              />

              {/* レベルアップボタン */}
              <Box mt={4} d={levelUpDisplay}>
                <Button
                  onClick={() => {
                    setTimeout(() => {
                      onClickLevelUp({
                        onOpenLevelUp,
                        onClickPraise,
                        onClickParty,
                      });
                    }, 200);
                  }}
                  bg="#ff9800"
                  color="#ffe13e"
                  fontSize="14px"
                  h="fit-content"
                  p={2}
                >
                  level up
                </Button>
              </Box>
            </Box>
            <Flex align="center">
              <Text fontSize="15px">称号</Text>
              <Text ml={5} fontWeight="bold">
                {profileTitle}
              </Text>
            </Flex>
          </Stack>
          <Box mt={3}>
            <Text color="whiteAlpha.800" fontSize="12px" lineHeight={2}>
              あなたの進化はここから始まります！
            </Text>
          </Box>
        </Box>
        <Box>
          <Image src={titleImage} w="180px" />
        </Box>
      </Flex>
      <Box d={commentDisplay} mx={2} mb={3}>
        <Comment>{`${user.user_name}「 ${user.comment} 」`}</Comment>
      </Box>
      <LevelUpModal
        onClose={onCloseLevelUp}
        isOpen={isOpenLevelUp}
        user={users[0]}
        level={level!}
        title={title!}
      />
    </PrimaryContainer>
  );
});
