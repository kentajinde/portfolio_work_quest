import axios from "axios";
import { FormikHelpers } from "formik";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useShowMessage } from "../useShowMessage";
import { useLoginUser } from "../useLoginUser";

type InitialValuesType = {
  userName: string;
  mail: string;
  pass: string;
  passConfirm: string;
  sex: string;
};

type OnSubmitProps = {
  values: InitialValuesType;
  actions: FormikHelpers<InitialValuesType>;
};

export const useSignup = () => {
  const initialValues: InitialValuesType = {
    userName: "",
    mail: "",
    pass: "",
    passConfirm: "",
    sex: "",
  };
  const history = useHistory();
  const { showMessage } = useShowMessage();
  const { setLoginUserId } = useLoginUser();

  const onSubmit: (props: OnSubmitProps) => void = useCallback((props) => {
    const { values, actions } = props;

    axios
      .post("http://localhost:4000/signup", values)
      .then((res) => {
        setTimeout(() => {
          showMessage({
            description: "ユーザー登録が完了しました！",
            status: "success",
          });
          setLoginUserId(res.data.userId);
          actions.setSubmitting(false);
          history.push("/top");
        }, 500);
      })
      .catch((err) => {
        showMessage({
          description: "ユーザー登録に失敗しました",
          status: "error",
        });
        throw err;
      });
  }, []);

  // validation
  const validationSchema = Yup.object({
    userName: Yup.string().required("*入力必須です"),
    mail: Yup.string()
      .email("メールアドレスが正しくありません")
      .required("*入力必須です")
      .test(
        "validateDuplicatedMail",
        "このメールアドレスは既に登録されています",
        (value): Promise<boolean> => {
          const validation = axios
            .get(
              `http://localhost:4000/get/validation/mail/duplicated/${value}`
            )
            .then((res) => {
              if (res.data.duplicate) {
                return false;
              } else {
                return true;
              }
            });
          return validation;
        }
      ),
    pass: Yup.string()
      .min(4, "パスワードは最低4文字です")
      .required("*入力必須です"),
    passConfirm: Yup.string().oneOf(
      [Yup.ref("pass")],
      "パスワードが一致しません"
    ),
    sex: Yup.string().required("*選択必須です"),
  });

  return { initialValues, onSubmit, validationSchema };
};