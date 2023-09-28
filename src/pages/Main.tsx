import { PropsWithChildren, useEffect } from "react";
import { mainMenu, siteConfig } from "../configs/site";
import { CardButton } from "../components/card-button";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ttsState, voicesState } from "../states/tts";

import LazyLoad from 'react-lazy-load';

export const MainPage: React.FC<PropsWithChildren> = () => {
    const {t, i18n} = useTranslation(['default']);
    const params = useParams()
    const {item} = params
	const [voices, setVoices] = useRecoilState(voicesState)
    const [tts, setTTS] = useRecoilState(ttsState)

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
            <div className="grid grid-cols-1 gap-4">
            {mainMenu?.map((item, index) => {
                console.log(index)
                return (
                    <CardButton to={item.href} title={item.title} img={item.img} key={index} titleClass="text-2xl" indexColor={index}/>
                )
            }
        )}
        </div>
        </div>
    )
}