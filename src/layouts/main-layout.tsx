import React, { PropsWithChildren } from "react"
import { Link, Outlet } from "react-router-dom"
import { siteConfig } from "../configs/site"
import { useTranslation } from "react-i18next";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {

    const {t, i18n} = useTranslation(['default']);

    return (
        <div className="flex h-screen flex flex-col pb-32 pt-16">
        <Outlet/>
        <div className="fixed bottom-0 p-6 w-full bg-white">
            <div className="flex gap-4 w-full">
            {
                siteConfig?.navMenu?.map((item, index) => {
                    return (
                        <Link to={item.href} key={index} className="flex justify-center items-center flex-col flex-1">
                        <div className="flex justify-center items-center flex-col flex-1">
                            <div className="text-2xl">
                                {item.emoji}
                            </div>
                            <div className="text-sm">
                                {t(item.title)}
                            </div>
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