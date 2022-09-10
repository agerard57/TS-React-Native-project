import { Field, Formik } from "formik";
import { Button, StyleSheet } from "react-native";

import { useTodoForm } from "../../hooks";
import { FormValuesInitializer } from "../../interfaces";
import { FormikTypes } from "../../types";
import { Themed } from "../Themed";
import { CustomInput } from "./CustomInput";
import { Image } from "./Image";
import { SelectInput } from "./SelectInput";

export const TodoForm = () => {
  const { Text, View } = Themed;
  const { handleSubmit, formValidationSchema } = useTodoForm();

  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={FormValuesInitializer}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        submitForm,
        isValid,
        values,
        setFieldValue,
        setFieldTouched,
      }: FormikTypes) => (
        <>
          <View style={styles.formInput}>
            <Text style={styles.label}>* List</Text>

            <View style={styles.picker}>
              <SelectInput
                values={values}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            </View>
          </View>
          <View style={styles.formInput}>
            <Field
              component={CustomInput}
              name="title"
              placeholder="Task title"
              maxLength={30}
              required
            />
          </View>
          <View style={styles.formInput}>
            <Field
              component={CustomInput}
              name="content"
              placeholder="Write description..."
              multiline
              numberOfLines={3}
              maxLength={300}
            />
          </View>
          <View style={styles.formInput}>
            <Image
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          </View>
          <View style={styles.formInput}>
            <Field
              component={CustomInput}
              name="author"
              placeholder="author"
              maxLength={20}
              required
            />
          </View>
          <Button
            onPress={() => submitForm()}
            title="Add your task!"
            disabled={!isValid || values.title === ""}
          />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formInput: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2855d8",
    elevation: 3,
    width: "40%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
