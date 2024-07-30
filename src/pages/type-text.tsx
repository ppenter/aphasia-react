import { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { textState, ttsState, voicesState, voiceState } from "../states/tts";
import { toast } from "react-toastify";
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export const TypeTextPage: React.FC<PropsWithChildren> = () => {
    const {t, i18n} = useTranslation(['default']);
    const [text, setText] = useRecoilState(textState)
    const [voices, setVoices] = useRecoilState(voicesState)
    const [voice, setVoice] = useRecoilState(voiceState)
    const [languages, setLanguages] = useState<string[]>([])
    const [tts, setTTS] = useRecoilState(ttsState)

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
    return(
        <div className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">💬 {t('tts')}</h1>
                <hr/>
                <div className="flex flex-col gap-2 py-12">
                    <input 
                    value={text}
                    onChange={e => {
                        setText(e.target.value)
                    }} type="text" className="p-2 border border-gray-300 rounded-md"/>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button onClick={e => {
                        speak(text)
                    }} className="p-8 text-4xl text-white bg-gray-200 rounded-md w-fit">🔊</button>
                </div>
            </div>
        </div>
    )
}