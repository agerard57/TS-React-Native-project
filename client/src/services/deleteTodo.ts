import { api } from "../config";

const url = (todoId: string) => `${api.url}/todo/${todoId}`;

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(url(todoId), {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    return [];
  }
};
