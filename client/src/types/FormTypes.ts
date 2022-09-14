import { FormikTypes } from "./FormikTypes";
import { TodoTypes } from "./TodoTypes";

type CustomInputProps = {
  multiline?: boolean;
  numberOfLines?: number;
  field?: any;
  form?: any;
  required?: boolean;
};

type InputProps = {
  values: Values;
  setFieldTouched: FormikTypes["setFieldTouched"];
  setFieldValue: FormikTypes["setFieldValue"];
};

type FieldValuesProps = {
  setFieldTouched: FormikTypes["setFieldTouched"];
  setFieldValue: FormikTypes["setFieldValue"];
};

type Values = {
  title: string;
  content: string;
  image: { fileName: string; file: string };
  list: TodoTypes["list"];
  author: string;
};

type Modes = "add" | "edit";

export type FormTypes = {
  field: CustomInputProps;
  fieldValues: FieldValuesProps;
  input: InputProps;
  modes: Modes;
  values: Values;
};
