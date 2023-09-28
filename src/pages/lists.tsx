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

export const ListPage: React.FC<PropsWithChildren> = ({children}) => {
    const {t, i18n} = useTranslation(['default']);
    const params = useParams()
    const {item} = params
    const menu = mainMenu?.find(e => e.title == item)

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
        if(!tts) {
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
    },[i18n?.language, item, params, setTTS, voices])

    useEffect(() => {
        loadVoices()
},[i18n?.language, item, params])

    return(
        <div className="flex flex-col p-4">
            <div className="flex gap-4 flex-wrap justify-evenly">
            {menu?.list?.map((item, index) => {
                const isFav = favorites?.find((e: any) => e == item.speech)
                return (
                    <div key={item.title} onClick={() => {
                        speak(t(`speech_${item.title}`))
                    }}>
                    <CardButtonSmall title={item.title} img={item.img} key={index} titleClass="text-2xl">
                        <div className="flex gap-2 items-center justify-center w-full">
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