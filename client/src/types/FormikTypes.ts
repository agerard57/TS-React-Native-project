import { FormTypes } from "./FormTypes";
import { TodoTypes } from "./TodoTypes";

export type FormikTypes = {
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  isValid: boolean;
  values: FormTypes["values"];
  setFieldValue: (
    field: string,
    value: string | TodoTypes["list"],
    shouldValidate?: boolean
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
};
