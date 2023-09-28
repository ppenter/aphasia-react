import { PropsWithChildren, useEffect } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useParams } from "react-router-dom";
import { CardButtonSmall } from "../components/card-button-small";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ttsState, voicesState } from "../states/tts";

export const ListPage: React.FC<PropsWithChildren> = ({children}) => {
    const {t, i18n} = useTranslation(['default']);
    const params = useParams()
    const {item} = params
    const menu = mainMenu?.find(e => e.title == item)

    const [voices, setVoices] = useRecoilState(voicesState)
    const [tts, setTTS] = useRecoilState(ttsState)

    function speak(txt: string){
        if(!tts) return
        if(speechSynthesis.speaking) return 
        if(!tts?.voice?.lang.includes(i18n?.language as string)) return
        tts.text = txt
        speechSynthesis.speak(tts)
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
        let _tts = new SpeechSynthesisUtterance()
        const voices = speechSynthesis.getVoices()
        setVoices(voices)
        const voice = voices?.find(e => e.lang.includes(i18n?.language as string))
        _tts.voice = voice || null
        setTTS(_tts)
        console.log('Set voice: ', voice)
},[i18n?.language, item, params])

    return(
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-3 gap-4">
            {menu?.list?.map((item, index) => {
                return (
                    <div key={item.title} onClick={() => {
                        speak(t(`speech_${item.title}`))
                    }}>
                    <CardButtonSmall title={item.title} img={item.img} key={index} titleClass="text-2xl"/>
                    </div>
                )
            }
        )}
        </div>
        </div>
    )
}