import { FormTypes } from "../types";

export const FormValuesInitializer: FormTypes["values"] = {
  title: "",
  content: "",
  image: { fileName: "", file: "" },
  list: "TODO",
  author: "",
};
