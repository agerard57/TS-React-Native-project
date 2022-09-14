import { RouteProp } from "@react-navigation/native";
import { Field, Formik } from "formik";
import { useEffect } from "react";
import { Button, StyleSheet } from "react-native";

import { useTodoForm } from "../../hooks";
import { FormValuesInitializer } from "../../interfaces";
import { FormikTypes, FormTypes, RootTabParamList } from "../../types";
import { Themed } from "../Themed";
import { CustomInput } from "./CustomInput";
import { Image } from "./Image";
import { SelectInput } from "./SelectInput";

type Props = {
  route:
    | RouteProp<RootTabParamList, "todo-add">
    | RouteProp<RootTabParamList, "todo-edit">;
  mode: FormTypes["modes"];
};

export const TodoForm = ({ route, mode }: Props) => {
  const { Text, View } = Themed;

  const { handleSubmit, formValidationSchema, editValues } = useTodoForm({
    route,
    mode,
  });

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
      }: FormikTypes) => {
        useEffect(() => {
          setFieldValue("list", editValues.list);
          setFieldValue("title", editValues.title);
          setFieldValue(
            "content",
            editValues.description ? editValues.description : ""
          );
          setFieldValue(
            "image.file",
            editValues.image ? editValues.image.file : ""
          );
          setFieldValue("author", editValues.author);
        }, [route.params, editValues]);

        return (
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
                maxLength={50}
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
                maxLength={500}
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
        );
      }}
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
