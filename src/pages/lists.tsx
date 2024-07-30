import { PropsWithChildren } from "react";
import { mainMenu } from "../configs/site";
import { useParams } from "react-router-dom";
import { ListView } from "../views/lists";

export const ListPage: React.FC<PropsWithChildren> = ({children}) => {
    const params = useParams()
    const {item: title} = params
    const menu = mainMenu?.find(e => e.title == title)

return (
    <ListView list={menu?.list?.map(l => {
        return {
            title: l.title,
            img: l.img,
            prefix: menu.title,
        }
    })} title={title?.toString() || ""}/>
)
}