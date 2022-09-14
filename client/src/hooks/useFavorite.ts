import { useEffect, useState } from "react";

import { getTodoByUserId } from "../services";
import { favoriteTodo } from "../services/favoriteTodo";

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
    });
  };

  return {
    favoriteStatus,
    favorite,
  };
};
