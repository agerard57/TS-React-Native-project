import { TextInput, StyleSheet } from "react-native";

import { FormTypes } from "../../types";
import { Themed } from "../Themed";

export const CustomInput = (props: FormTypes["field"]) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    required,
    ...inputProps
  } = props;
  const { Text } = Themed;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <Text style={styles.label}>
        {required ? "* " : "  "}
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          props.multiline && {
            height: props.numberOfLines ? props.numberOfLines * 40 : 40,
          },
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: 10,
    paddingLeft: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});
