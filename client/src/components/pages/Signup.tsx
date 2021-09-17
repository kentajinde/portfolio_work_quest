import { VFC } from "react";
import { Box, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimarySelect } from "../molcules/forms/PrimarySelect";
import { LoginHeaderContainer } from "../molcules/LoginHeaderContainer";
import { LoginHeaderForm } from "../molcules/LoginHeaderForm";
import { Form, Formik } from "formik";
import { memo } from "react";
import { useSignup } from "../../hooks/form/useSignup";
import { FooterLayout } from "../templates/FooterLayout";

export const Signup: VFC = memo(() => {
  const { initialValues, onSubmit, validationSchema } = useSignup();

  return (
    <FooterLayout>
      <Box>
        <LoginHeaderContainer>
          <LoginHeaderForm signup={true}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => onSubmit({ values, actions })}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={5}>
                    <PrimaryInputText
                      placeholder="ユーザーネーム"
                      name="userName"
                    />
                    <PrimaryInputText
                      placeholder="メールアドレス"
                      name="mail"
                    />
                    <PrimaryInputText
                      placeholder="パスワード"
                      name="pass"
                      type="password"
                    />
                    <PrimaryInputText
                      placeholder="パスワードの確認"
                      name="passConfirm"
                      type="password"
                    />
                    <PrimarySelect
                      placeholder="- 性別 -"
                      name="sex"
                      options={[
                        { value: "male", text: "男性" },
                        { value: "female", text: "女性" },
                      ]}
                    />
                    <PrimaryButton isLoading={isSubmitting}>
                      新規登録
                    </PrimaryButton>
                  </Stack>
                </Form>
              )}
            </Formik>
          </LoginHeaderForm>
        </LoginHeaderContainer>
      </Box>
    </FooterLayout>
  );
});