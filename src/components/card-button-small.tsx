import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CardButtonSmall = ({title, to, img='/images/menu/wave.png', children, titleClass}: any) => {
  const {t, i18n} = useTranslation(['speech']);

  const inner = () => {
    return(
      <div className="relative flex flex-col items-center w-full gap-0 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 aspect-square h-[280px] justify-between">
      {/* Full width image */}
      <img src={img} className="object-cover w-full rounded-t-lg max-w-[120px]" onError={({currentTarget}) => {
        currentTarget.onerror = null;
        currentTarget.src = '/images/menu/speaker.png'
      }} />
      <div className="">
      {/* <h5 className={`whitespace-nowrap mb-2 font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}>
        {t(title)}
        </h5> */}
        <h5 className={`break-words text-center mb-2 text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}>
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