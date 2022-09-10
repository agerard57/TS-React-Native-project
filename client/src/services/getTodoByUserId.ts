import { api } from "../config";

const url = (userId: string) => `${api.url}/todo/${userId}`;

export const getTodoByUserId = async (userId: string) => {
  try {
    const response = await fetch(url(userId));
    return await response.json();
  } catch (error) {
    return [];
  }
};
