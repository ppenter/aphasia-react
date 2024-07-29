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
import { ListView } from "../views/lists";

export const ListPage: React.FC<PropsWithChildren> = ({children}) => {
    const {t, i18n} = useTranslation(['default'])
    const {t: speechT} = useTranslation(['speech'])
    const params = useParams()
    const {item: title} = params
    const menu = mainMenu?.find(e => e.title == title)

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
        console.log('Speaking: ', txt)
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
    },[i18n?.language, title, params, setTTS, voices])

    useEffect(() => {
        loadVoices()
},[i18n.language, title, params])

return (
    <ListView list={menu?.list?.map(l => {
        return {
            title: l.title,
            img: l.img,
            prefix: menu.title,
        }
    })} title={title?.toString() || ""}/>
)
}