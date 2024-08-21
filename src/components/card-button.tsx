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
  const color = genColor((indexColor + 1) * 4444);
  return (
    <Link to={to}>
      <div
        className={cn(
          "flex flex-col items-center items-center gap-4 px-4 py-12 bg-white justify-evenly",
          className,
        )}
        style={{
          backgroundColor: `#${color}`,
          opacity: 0.9,
        }}
      >
        {/* Full width image */}
        <div className="pt-12">
          <img src={img} width={64} height={64} className="min-w-[64px]" />
        </div>
        <div className="flex-1">
          <h5
            className={`whitespace-nowrap mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}
          >
            {t(title)}
          </h5>
          {children}
        </div>
      </div>
    </Link>
  );
};
