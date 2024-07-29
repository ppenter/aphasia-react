import React, { PropsWithChildren } from "react"
import { Link, Outlet } from "react-router-dom"
import { siteConfig } from "../configs/site"
import { useTranslation } from "react-i18next";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {

    const {t, i18n} = useTranslation(['default']);

    return (
        <div className="flex flex-col h-screen pt-12 pb-32 max-sm:pt-32">
            <div className="fixed top-0 w-full p-4 bg-white shadow max-sm:pt-20">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        AphasiaTalk
                    </div>
                    <div className="flex gap-4">
                        
                    </div>
                </div>
            </div>
        <div className="pt-6">
        <Outlet/>
        </div>
        <div className="fixed bottom-0 w-full p-6 bg-white shadow-2xl">
            <div className="flex w-full gap-4">
            {
                siteConfig?.navMenu?.map((item, index) => {
                    return (
                        <Link to={item.href} key={index} className="flex flex-col items-center justify-center flex-1">
                        <div className="flex flex-col items-center justify-center flex-1">
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