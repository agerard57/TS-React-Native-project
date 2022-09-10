import { api } from "../config";
import { FormTypes } from "../types";

const url = (userId: string) => `${api.url}/todo/${userId}`;

export const getTodos = async (
  values: { id: string } & FormTypes["values"]
) => {
  try {
    const response = await fetch(url(values.id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });
    return await response.json();
  } catch (error) {
    return [];
  }
};
