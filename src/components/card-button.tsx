import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { cn, genColor } from "../libs/utils";

export const CardButton = ({
  title = "iwant",
  to,
  img = "/images/menu/wave.png",
  children,
  titleClass,
  indexColor = 0,
  className,
}: any) => {
  const { t, i18n } = useTranslation(["default"]);
  const color = indexColor
  // const color = genColor((indexColor + 1) * 4444);
  const getColor = (index: number) => {
    switch (index) {
      case 0:
        return "#ecc25d";
      case 1:
        return "#ea9f4f";
      case 2:
        return "#dd7d72";
      case 3:
        return "#99667b";
      default:
        return "#FFD700";
    }
  }
  const getTextColor = (index: number) => {
    switch (index) {
      case 0:
        return "#000000";
      case 1:
        return "#000000";
      case 2:
        return "#ffffff";
      case 3:
        return "#ffffff";
      default:
        return "#000000";
  }};
  return (
    <Link to={to}>
      <div
        className={cn(
          "flex items-center gap-4 px-4 bg-white justify-evenly h-full",
          className,
        )}
        style={{
          backgroundColor: `${getColor(indexColor)}`,
          opacity: 0.9,
        }}
      >
        {/* Full width image */}
        <div className="">
          <img src={img} width={64} height={64} className="min-w-[64px] invert" />
        </div>
        <div className="flex items-center justify-start flex-1">
          <h5
            className={`
              whitespace-nowrap mb-2 text-5xl tracking-tight ${titleClass}
              max-xs:text-4xl
              `}
              style={{
                color: `${getTextColor(indexColor)}`,
              }}
          >
            {t(title)}
          </h5>
          {children}
        </div>
      </div>
    </Link>
  );
};
