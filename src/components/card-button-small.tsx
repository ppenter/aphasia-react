import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CardButtonSmall = ({title='iwant', to, img='/images/menu/wave.png', children, titleClass}: any) => {
  const {t, i18n} = useTranslation(['default']);
    return(
      <Link to={to}>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 aspect-square flex flex-col items-center p-6">
      {/* Full width image */}
      <img src={img} width='100%' height='100%' className="object-cover w-full h-128 rounded-t-lg"/>
      <div className="px-5">
      <h5 className={`whitespace-nowrap mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white ${titleClass}`}>{t(title)}</h5>
      {
children
      }
      </div>
  </div>
  </Link>
    )
}