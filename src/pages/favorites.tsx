import { PropsWithChildren } from "react";
import { ListView } from "../views/lists";
import { favoriteState } from "../states/fav";
import { useRecoilState } from "recoil";
import { mainMenu } from "../configs/site";

export const FavoritesPage: React.FC<PropsWithChildren> = () => {

    const [favorites, setFavorites] = useRecoilState(favoriteState);
    
    const items = mainMenu?.reduce<{ title: string; img: string }[]>((acc, cur) => {
        const have = cur.list?.filter(e => favorites?.find((f: any) => f === e.title))
        if(!have) return acc
        return [...acc, ...[
            ...have.map(e => ({title: e.title, img: e.img, prefix: cur.title}))
        ]]
    },[]);

    
    return(
        <div className="flex flex-col px-6 ">
            <h1 className="mb-4 text-2xl font-bold">Favorites</h1>
            <hr/>
            <div className="flex flex-col gap-2 mt-4">
                <ListView list={items} title="Favorites"/>
            </div>
        </div>
    )
}