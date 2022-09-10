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

type PickImageProps = {
  setFieldTouched: FormikTypes["setFieldTouched"];
  setFieldValue: FormikTypes["setFieldValue"];
};

type Values = {
  title: string;
  content: string;
  image: { fileName: string };
  list: TodoTypes["list"];
  author: string;
};

export type FormTypes = {
  field: CustomInputProps;
  pickImage: PickImageProps;
  input: InputProps;
  values: Values;
};
