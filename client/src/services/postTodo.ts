import { api } from "../config";

const url = `${api.url}/todos`;

export const postTodo = async (values: {
  title: string;
  content: string;
  image: { fileName: string };
  list: string;
  author: string;
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      // Send as JSON
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
