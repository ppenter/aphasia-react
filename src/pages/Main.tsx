import { PropsWithChildren } from "react";
import { mainMenu } from "../configs/site";
import { CardButton } from "../components/card-button";

export const MainPage: React.FC<PropsWithChildren> = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="grid h-full grid-cols-3">
        {mainMenu?.map((item, index) => {
          return (
            <CardButton
              to={item.href}
              title={item.title}
              img={item.img}
              key={index}
              titleClass="text-2xl"
              indexColor={index}
              className={"h-full"}
            />
          );
        })}
      </div>
    </div>
  );
};
