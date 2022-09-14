import { api } from "../config";

export const favoriteTodo = async (id: string, fav: boolean) => {
  try {
    const response = await fetch(`${api.url}/todo/fav/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fav: fav }),
    });
    return await response.json();
  } catch (error) {
    return [];
  }
};
