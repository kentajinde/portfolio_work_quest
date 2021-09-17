import { memo, useState } from "react";
import { FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment, { Moment } from "moment";
import "react-dates/lib/css/_datepicker.css";

import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { Box } from "@chakra-ui/layout";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";
import { WorkInitialValuesType, WorkOnSubmitProps } from "../../hooks/useWorks";
import "../../assets/css/react-dates.css";

type Props = {
  initialValues: WorkInitialValuesType;
  onSubmit: (values: WorkOnSubmitProps) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const AddWorkModal = memo((props: Props) => {
  const { initialValues, onSubmit, onClose, isOpen } = props;
  const [date, setDate] = useState<Moment>();
  const [focused, setFocused] = useState(false);

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen} isCentered={false}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              onSubmit({ values, actions });
              onClose();
            }, 500);
          }}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue(
                  "deadline",
                  date ? moment.utc(date).format("YYYY-MM-DD") : null
                );
              }}
            >
              <FormLabel textAlign="center" mb={6}>
                ワーク名
                <PrimaryInputText name="workName" />
              </FormLabel>
              <FormLabel textAlign="center" mb={6}>
                締切 （任意）
                <SingleDatePicker
                  id="what is this"
                  date={date!}
                  placeholder="カレンダー"
                  onDateChange={(date) => setDate(date!)}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  displayFormat="YYYY/MM/DD"
                  numberOfMonths={1}
                  block={true}
                />
              </FormLabel>
              <SubmitOrCancel onClose={onClose} isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});