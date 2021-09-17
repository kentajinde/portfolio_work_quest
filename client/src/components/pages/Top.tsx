import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { AddContents } from "../molcules/AddContents";
import { WorkList } from "../molcules/WorkList";
import { PrimaryLayout } from "../templates/PrimaryLayout";
import villager from "../../image/title/villager.png";
import { WorkContainer } from "../atoms/WorkContainer";
import { Status } from "../organisms/Status";
import { useWorks } from "../../hooks/useWorks";
import { DrawerButton } from "../molcules/DrawerButton";
import { users } from "../../assets/data/users";
import { useFile } from "../../hooks/useFile";
import { ProfileFormModal } from "../organisms/ProfileFormModal";
import { useDisclosureProfile } from "../../hooks/useDisclosureProfile";
import { useDisclosureWork } from "../../hooks/useDisClosureWork";
import { useDisclosureComplete } from "../../hooks/useDisclosureComplete";
import { CompleteWorkDrawer } from "../organisms/CompleteWorkDrawer";
import { AddWorkModal } from "../organisms/AddWorkModal";
import { useDisclosureCheeredOn } from "../../hooks/useDisclosureCheeredOn";
import { CheeredOnDrawer } from "../organisms/CheeredOnDrawer";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useLevelUp } from "../../hooks/useLevelup";
import userDefault from "../../image/user_default.png";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";

export const Top: VFC = memo(() => {
  const { loginUserId } = useLoginUser();
  const { user, setUser } = useFetchUser(loginUserId as number);
  // プロフィール画像の設定が無ければ初期画像表示
  const { inspectedPicture, keyName } = useDefaultPicture(
    user.picture,
    "member/"
  );
  const {
    initialValues,
    incompleteWorks,
    completeWorks,
    onSubmit,
    onClickDelete,
    onClickComplete,
    onClickBack,
  } = useWorks(loginUserId as number);
  const { file, fileLoad } = useFile(
    `https://work-quest.s3.ap-northeast-3.amazonaws.com/${keyName}${inspectedPicture}`
  );
  const { experienceRate, levelUpFlag, level, title, onClickLevelUp } =
    useLevelUp(loginUserId as number);

  const { isOpenProfile, onCloseProfile, onOpenProfile } =
    useDisclosureProfile();
  const { isOpenWork, onCloseWork, onOpenWork } = useDisclosureWork();
  const { isOpenComplete, onCloseComplete, onOpenComplete } =
    useDisclosureComplete();
  const { isOpenCheeredOn, onCloseCheeredOn, onOpenCheeredOn } =
    useDisclosureCheeredOn();

  return (
    <PrimaryLayout
      onClick={onOpenProfile}
      src={`https://work-quest.s3.ap-northeast-3.amazonaws.com/${keyName}${inspectedPicture}`}
    >
      <PrimaryWrapper>
        <Flex
          py={{ base: 3, md: 6 }}
          px={{ base: 2 }}
          fontSize={{ base: "18px" }}
          color="orange.400"
        >
          {/* 応援されたリスト */}
          <Flex
            align="center"
            fontSize="26px"
            color="#debd0b"
            w="fit-content"
            cursor="pointer"
            onClick={onOpenCheeredOn}
          >
            <InsertEmoticonIcon color="inherit" fontSize="inherit" />
            <Text ml={2} color="#43da3e">
              {users.length}
            </Text>
          </Flex>
        </Flex>

        <Status
          user={user}
          titleImage={villager}
          level={level}
          title={title}
          experienceRate={experienceRate}
          flag={levelUpFlag}
          onClickLevelUp={onClickLevelUp}
          myProfile={true}
        />

        <Box mt="30px">
          <WorkContainer>
            <Box py={4} px={6}>
              <AddContents onClick={onOpenWork} />
              <Box mt={3}>
                {incompleteWorks.length != 0 ? (
                  <WorkList
                    works={incompleteWorks}
                    onClickDelete={onClickDelete}
                    onClickComplete={onClickComplete}
                  />
                ) : (
                  <Flex align="center" justify="center" pt={5}>
                    <Text>Workを設定しましょう！</Text>
                  </Flex>
                )}
              </Box>
            </Box>
          </WorkContainer>
        </Box>
        <DrawerButton
          text={`完了したWork (${completeWorks.length})`}
          onClick={onOpenComplete}
        />
      </PrimaryWrapper>

      {/* モーダル */}
      <ProfileFormModal
        user={user}
        setUser={setUser}
        onClose={onCloseProfile}
        isOpen={isOpenProfile}
        onChange={fileLoad}
        src={file}
      />
      <AddWorkModal
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onCloseWork}
        isOpen={isOpenWork}
      />
      <CompleteWorkDrawer
        completeWorks={completeWorks}
        onClick={onClickBack}
        onClose={onCloseComplete}
        isOpen={isOpenComplete}
      />
      <CheeredOnDrawer
        onClose={onCloseCheeredOn}
        isOpen={isOpenCheeredOn}
        users={users}
      />
    </PrimaryLayout>
  );
});