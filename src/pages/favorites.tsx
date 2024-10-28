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

  return (
    <div className="flex flex-col px-6 pt-6">
      <h1 className="mb-4 text-2xl font-bold">{t("favorites")}</h1>
      <hr />
      <div className="flex flex-col gap-2 mt-4">
        <ListView list={items} title="Favorites" />
      </div>
    </div>
  );
};
