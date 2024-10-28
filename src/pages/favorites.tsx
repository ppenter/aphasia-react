import { PropsWithChildren } from "react";
import ListView from "../views/lists";
import { favoriteState } from "../states/fav";
import { useRecoilState } from "recoil";
import { mainMenu } from "../configs/site";
import { useTranslation } from "react-i18next";

export const FavoritesPage: React.FC<PropsWithChildren> = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteState);
  const { t } = useTranslation(["default"]);

  const items = favorites.map((item) => {
    if (!item?.title) return null;
    return {
      ...item,
    };
  });

  return <ListView list={items} title="Favorites" />;
};
