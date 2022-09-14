import { useEffect, useState } from "react";

import { getTodoByUserId } from "../services";
import { favoriteTodo } from "../services/favoriteTodo";
import { useToast } from "./useToast";

export const useFavorite = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const favoriteStatus = (id: string) => {
    useEffect(() => {
      getTodoByUserId(id).then((todo) => {
        setIsFavorite(todo.fav);
      });
    }, [id]);

    return isFavorite;
  };

  const favorite = (id: string) => {
    favoriteTodo(id, isFavorite).then((_todo) => {
      setIsFavorite(!isFavorite);
      useToast(
        `Your todo is ${
          isFavorite ? "no longer a favorite" : "now a favorite"
        }`,
        isFavorite ? "alert" : "success"
      );
    });
  };

  return {
    favoriteStatus,
    favorite,
  };
};
