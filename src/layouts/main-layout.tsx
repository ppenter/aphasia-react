import React, { PropsWithChildren } from "react"
import { Link, Outlet } from "react-router-dom"
import { siteConfig } from "../configs/site"
import { useTranslation } from "react-i18next";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {

    const {t, i18n} = useTranslation(['default']);

    return (
        <div className="flex flex-col h-screen pt-12 max-sm:pt-28">
        <div className="h-full pt-6">
        <Outlet/>
        </div>
        <div className="fixed top-0 w-full p-4 bg-white bg-gray-300 shadow max-sm:pt-20">
                <div className="flex items-center justify-between">
                {
                siteConfig?.navMenu?.map((item, index) => {
                    if(!item?.title) return(
                        <div className="flex-1">
                            </div>
                    )
                    return (
                        <Link to={item.href} key={index} className="flex flex-col items-center justify-center flex-1">
                        <div className="flex flex-col items-center justify-center flex-1">
                            <img src={item?.image} width={48} height={48}/>
                        </div>
                        </Link>
                    )
                })
            }
                </div>
            </div>
        </div>
    )
}