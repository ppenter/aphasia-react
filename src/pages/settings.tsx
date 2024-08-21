import { PropsWithChildren } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useTranslation } from "react-i18next";
import _package from "../../package.json";

export const SettingPage: React.FC<PropsWithChildren> = () => {
  const { t, i18n } = useTranslation(["default"]);

  const changeLanguage = (e: any) => {
    localStorage.setItem("lang", e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t("settings")}</h1>
        <div className="p-4 border-2 border-dashed rounded-lg">
          <div className="flex justify-between w-full">
            <p className="font-bold">{t("language")}</p>
            <div>
              <select value={i18n.language} onChange={changeLanguage}>
                <option value="en">English</option>
                <option value="th">ไทย</option>
              </select>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{t("about")}</h1>
        <div className="grid gap-4 text-center">
          <span>
            {_package?.name} v{_package?.version}
          </span>
          <div className="flex flex-wrap justify-evenly">
            <img src="/images/muict_logo.png" width={240} height={200} />
            <img src="/images/murama_logo.png" width={200} height={200} />
          </div>
          <div>
            <p className="font-semibold">{t("developed_by")}</p>
            <p>{t("contact")}</p>
          </div>
          <div>
            <p className="font-semibold">{t("advisors")}</p>
            <p>{t("advisors_contact1")}</p>
            <p>{t("advisors_contact2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
