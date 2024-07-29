import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CardButtonSmall = ({title, to, img='/images/menu/wave.png', children, titleClass}: any) => {
  const {t, i18n} = useTranslation(['default']);

  const inner = () => {
    return(
      <div className="flex flex-col items-center w-full gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 aspect-square h-[240px]">
      {/* Full width image */}
      <img src={img} className="object-cover w-full rounded-t-lg max-w-[120px]"/>
      <div className="">
      <h5 className={`whitespace-nowrap mb-2 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}>
        {t(title)}
        </h5>
        <h5 className={`whitespace-nowrap mb-2 text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}>
        {children}
        </h5>
      </div>
  </div>
    )
  }
    return(
      <>
      {
        to ? (
          <Link to={to}>
          {inner()}
          </Link>
        ) : (
          <>
          {inner()}
          </>
        )
      }
      </>
    )
}