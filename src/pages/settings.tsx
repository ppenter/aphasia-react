import { PropsWithChildren } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useTranslation } from "react-i18next";

export const SettingPage: React.FC<PropsWithChildren> = () => {
    const {t, i18n} = useTranslation(['default']);

    console.log(i18n)

    const changeLanguage = (e: any) => {
        i18n.changeLanguage(e.target.value)
    }
    return(
        <div className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{t('settings')}</h1>
                <hr/>
                <div className="flex w-full justify-between">
                    <p>
                        {t('language')}
                    </p>
                    <div>
                        <select value={i18n.language} onChange={changeLanguage}>
                            <option value="en">English</option>
                            <option value="th">ไทย</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}