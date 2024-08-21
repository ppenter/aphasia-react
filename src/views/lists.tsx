import { PropsWithChildren, useEffect, useState } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useParams } from "react-router-dom";
import { CardButtonSmall } from "../components/card-button-small";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ttsState, voicesState, voiceState } from "../states/tts";
import { favoriteState } from "../states/fav";
import Heart from "../icons/heart.svg";
import HeartFull from "../icons/heart-full.svg";
import { toast } from "react-toastify";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { cn } from "../libs/utils";

export interface IListView extends PropsWithChildren {
  list?: any[];
  title: string;
}

const mockList = [
  {
    title: "apple",
    group: "fruit",
  },
  {
    title: "banana",
    group: "fruit",
  },
  {
    title: "kang jubchai",
    group: "kang",
  },
  {
    title: "kang jued tao hoo",
    group: "kang",
  },
  {
    title: "yum pla dook foo",
    group: "yum",
  },
];

export const ListView: React.FC<IListView> = ({
  children,
  list = mockList,
  title,
}) => {
  const { t, i18n } = useTranslation(["speech"]);

  const [favorites, setFavorites] = useRecoilState(favoriteState);

  const [voices, setVoices] = useRecoilState(voicesState);
  const [voice, setVoice] = useRecoilState(voiceState);
  const [languages, setLanguages] = useState<string[]>([]);
  const [group_list, setGroupList] = useState<any>();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setGroupList(list?.reduce((acc: any, item: any) => {
      if (!acc[item?.group]) {
        acc[item?.group] = [];
      }
      acc[item?.group].push(item);
      return acc;
    }, {}));
  }, [list])
  // const [tts, setTTS] = useRecoilState(ttsState)

  const loadVoices = async () => {
    const { voices } = await TextToSpeech.getSupportedVoices();
    setVoices(voices);
    const voice = voices?.find((e) =>
      e.lang.includes(i18n?.language as string),
    );
    setVoice(voice);
    const langs = await TextToSpeech.getSupportedLanguages();
    setLanguages(langs.languages);
  };

  async function speak(txt: string) {
    try {
      await loadVoices();
      toast.success(t(txt));
      await TextToSpeech.speak({
        text: txt,
        lang: i18n?.language,
      });
    } catch (e) {
      // toast.error(e.message)
    }
  }

  useEffect(() => {
    loadVoices();
  }, [i18n?.language]);

  useEffect(() => {
    // debounce search
    const timer = setTimeout(() => {
      if (search) {
        // filter list
        const filtered = list?.filter((item: any) => {
          const translation = t(`${item?.id}.text`);
          return  translation?.toLowerCase()?.includes(search?.toLowerCase()) || item?.title?.toLowerCase()?.includes(search?.toLowerCase());
        });
        setGroupList(filtered?.reduce((acc: any, item: any) => {
          if (!acc[item?.group]) {
            acc[item?.group] = [];
          }
          acc[item?.group].push(item);
          return acc;
        }, {}));
      }else{
        setGroupList(list?.reduce((acc: any, item: any) => {
          if (!acc[item?.group]) {
            acc[item?.group] = [];
          }
          acc[item?.group].push(item);
          return acc;
        }, {}));
      }
      console.log("search", group_list );
    }, 500);
    return () => clearTimeout(timer);
  },[search])


  return (
    <div className="flex flex-col gap-4 p-4 pt-6">
      <input type="text" className="p-2 border-2 border-dashed rounded-lg" value={search} onChange={e => {
        setSearch(e.target.value)
      }} />
      <div className="">
        {group_list &&
          Object.keys(group_list)?.map?.((group, index) => {
            return (
              <div key={group} className="grid col-span-1 gap-2">
                {group !== "undefined" && (
                  <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t(`${title}.__group__.${group}`)}
                  </h3>
                )}
                <div className="grid grid-cols-2 gap-4 pb-32 sm:grid-cols-3 lg:grid-cols-5">
                  {group_list[group].map((item: any, index: number) => {
                    if (!item?.title) return null;
                    const speech_id =
                      item?.speech || `${title}.${item?.title}.speech`;
                    const img_url =
                      item?.img ||
                      `/images/items/${title}/${item?.title?.toLocaleLowerCase()?.replaceAll(" ", "_")}.png`;
                    const isFav = favorites?.find(
                      (e: any) => e?.speech == speech_id,
                    );
                    return (
                      <div
                        key={item.title}
                        onClick={async () => {
                          await speak(t(speech_id));
                        }}
                      >
                        <CardButtonSmall
                          title={item.title}
                          img={img_url}
                          key={index}
                          titleClass="text-4xl"
                        >
                          <div className="flex flex-col items-center justify-center w-full max-w-full gap-4">
                            <h5
                              className={cn(
                                "text-4xl font-bold tracking-tight text-gray-900 dark:text-white break-words",
                              )}
                            >
                              {item?.custom
                                ? item?.title
                                : t(`${item?.id}.text`)}
                            </h5>
                            <img
                              alt="heart"
                              src={isFav ? HeartFull : Heart}
                              className="absolute w-6 h-6 top-4 right-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFavorites((old: any) => {
                                  if (isFav) {
                                    return old.filter(
                                      (e: any) => e?.speech != speech_id,
                                    );
                                  } else {
                                    return [
                                      ...old,
                                      {
                                        title: item.title,
                                        speech: speech_id,
                                        img: img_url,
                                        id: item?.id,
                                      },
                                    ];
                                  }
                                });
                              }}
                            />
                          </div>
                        </CardButtonSmall>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
