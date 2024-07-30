import { PropsWithChildren, useEffect, useState } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useParams } from "react-router-dom";
import { CardButtonSmall } from "../components/card-button-small";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ttsState, voicesState, voiceState } from "../states/tts";
import { favoriteState } from "../states/fav";
import Heart from '../icons/heart.svg'
import HeartFull from '../icons/heart-full.svg'
import { toast } from "react-toastify";
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export interface IListView extends PropsWithChildren{
    list?: any[]
    title: string
}

const mockList = [
    {
        "title": "eat",
        "img": "/images/menu/iwant/vegetarian.png",
        "speech": "I want to eat"
    },
    {
        "title": "drink",
        "img": "/images/menu/iwant/water-bottle.png",
        "speech": "I want to drink"
    },
    {
        "title": "get up",
        "img": "/images/menu/iwant/support.png",
        "speech": "I want to get up"
    },
    {
        "title": "rest",
        "img": "/images/menu/iwant/day.png",
        "speech": "I want to rest"
    },
    {
        "title": "toilet",
        "img": "/images/menu/iwant/toilet.png",
        "speech": "I want to use the restroom"
    }
]

export const ListView: React.FC<IListView> = ({children, list=mockList, title}) => {
    const {t, i18n} = useTranslation(['default']);

    const [favorites, setFavorites] = useRecoilState(favoriteState)

    const [voices, setVoices] = useRecoilState(voicesState)
    const [voice, setVoice] = useRecoilState(voiceState)
    const [languages, setLanguages] = useState<string[]>([])
    // const [tts, setTTS] = useRecoilState(ttsState)

    const loadVoices = async () => {
        const {voices} = await TextToSpeech.getSupportedVoices()
        setVoices(voices)
        const voice = voices?.find(e => e.lang.includes(i18n?.language as string))
        setVoice(voice)
        const langs = await TextToSpeech.getSupportedLanguages()
        setLanguages(langs.languages)
    }

    async function speak(txt: string){
        await loadVoices()
        toast.success(t(txt))
        await TextToSpeech.speak({
            text: txt,
            lang: i18n?.language
        })
    }

    useEffect(() => {
        loadVoices()
    },[i18n?.language])

    return(
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-2 gap-4 pb-32 sm:grid-cols-5 lg:grid-cols-10">
            {list?.map((item, index) => {
                const isFav = favorites?.find((e: any) => e == item.title)
                return (
                    <div key={item.title} onClick={async () => {
                        await speak(item?.speech || `${t(item?.prefix?.toString() || "") + " " + t(item?.title)}`)
                    }}>
                    <CardButtonSmall title={item.title} img={
                        `/images/items/${item.title?.toLocaleLowerCase()?.replaceAll(' ', '_')}.png`
                    } key={index} titleClass="text-2xl">
                        <div className="flex items-center justify-center w-full gap-4">
                            <img alt="heart" src={isFav ? HeartFull : Heart} className="w-6 h-6" onClick={e => {
                                e.stopPropagation()
                                setFavorites((old: any) => {
                                    if(isFav){
                                        return old.filter((e: any) => e != item.title)
                                    }else{
                                        return [...old, item.title]
                                    }
                                }
                                )
                            }}/>
                        </div>
                    </CardButtonSmall>
                    </div>
                )
            }
        )}
        </div>
        </div>
    )
}