import { PropsWithChildren, useEffect } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useParams } from "react-router-dom";
import { CardButtonSmall } from "../components/card-button-small";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ttsState, voicesState } from "../states/tts";
import { favoriteState } from "../states/fav";
import Heart from '../icons/heart.svg'
import HeartFull from '../icons/heart-full.svg'
import { toast } from "react-toastify";

export interface IListView extends PropsWithChildren{
    list?: any[]
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

export const ListView: React.FC<IListView> = ({children, list=mockList}) => {
    const {t, i18n} = useTranslation(['default']);

    const [favorites, setFavorites] = useRecoilState(favoriteState)

    const [voices, setVoices] = useRecoilState(voicesState)
    const [tts, setTTS] = useRecoilState(ttsState)

    const loadVoices = () => {
        let _tts = new SpeechSynthesisUtterance()
        const voices = speechSynthesis.getVoices()
        setVoices(voices)
        const voice = voices?.find(e => e.lang.includes(i18n?.language as string))
        _tts.voice = voice || null
        setTTS(_tts)
        console.log('Set voice: ', voice)
    }

    function speak(txt: string){
        if(!tts){
            loadVoices()
            toast.error('TTS not ready')
            return
        }
        if(speechSynthesis.speaking) return 
        if(!tts?.voice?.lang.includes(i18n?.language as string)){
            loadVoices()
            toast.error('TTS not ready')
            return
        }
        tts.text = txt
        speechSynthesis.speak(tts)
        toast.success(t(txt))
    }

    useEffect(() => {
        let _tts = new SpeechSynthesisUtterance()
            if(!voices) return
            console.log('Loading voice')
            const voice = voices.find(e => e.lang.includes(i18n?.language as string))
            _tts.voice = voice || null
            setTTS(_tts)
            console.log('Set voice: ', voice)
    },[i18n?.language, setTTS, voices])

    useEffect(() => {
        loadVoices()
},[i18n?.language])

    return(
        <div className="flex flex-col p-4">
            <div className="flex gap-2 flex-wrap justify-evenly">
            {list?.map((item, index) => {
                const isFav = favorites?.find((e: any) => e == item.speech)
                return (
                    <div key={item.title} onClick={() => {
                        speak(t(`speech_${item.title}`))
                    }}>
                    <CardButtonSmall title={item.title} img={item.img} key={index} titleClass="text-2xl">
                        <div className="flex gap-4 items-center justify-center w-full">
                            <img alt="heart" src={isFav ? HeartFull : Heart} className="w-6 h-6" onClick={e => {
                                e.stopPropagation()
                                setFavorites((old: any) => {
                                    if(isFav){
                                        return old.filter((e: any) => e != item.speech)
                                    }else{
                                        return [...old, item.speech]
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