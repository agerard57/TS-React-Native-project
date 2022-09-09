import { api } from "../config";

const url = `${api.url}/todos`;

export const getTodos = async () => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return [];
  }
};
