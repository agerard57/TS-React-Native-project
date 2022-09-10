import RNPickerSelect from "react-native-picker-select";

import { FormTypes } from "../../types";

export const SelectInput = ({
  values,
  setFieldTouched,
  setFieldValue,
}: FormTypes["input"]) => {
  return (
    <RNPickerSelect
      pickerProps={{
        accessibilityLabel: values.list,
      }}
      style={{
        placeholder: {
          color: "",
          fontWeight: "bold",
        },
      }}
      onValueChange={(value) => {
        value !== null
          ? (setFieldValue("list", value), setFieldTouched("list", true))
          : (setFieldValue("list", ""), setFieldTouched("list", false));
      }}
      items={[
        { label: "To do", value: "TODO" },
        { label: "In progress...", value: "IN PROGRESS" },
        { label: "Done !", value: "DONE" },
      ]}
    />
  );
};
