import { PropsWithChildren } from "react";
import { mainMenu } from "../configs/site";
import { CardButton } from "../components/card-button";

export const MainPage: React.FC<PropsWithChildren> = () => {
    return(
        <div className="flex flex-col">
            <div className="grid grid-cols-1">
            {mainMenu?.map((item, index) => {
                return (
                    <CardButton to={item.href} title={item.title} img={item.img} key={index} titleClass="text-2xl" indexColor={index}/>
                )
            }
        )}
        </div>
        </div>
    )
}