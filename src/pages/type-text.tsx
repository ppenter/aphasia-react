import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { textState, ttsState, voicesState } from "../states/tts";
import { toast } from "react-toastify";

export const TypeTextPage: React.FC<PropsWithChildren> = () => {
    const {t, i18n} = useTranslation(['default']);
    const [text, setText] = useRecoilState(textState)
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
                    }} type="text" className="border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <button onClick={e => {
                        speak(text)
                    }} className="bg-gray-200 text-white rounded-md w-fit p-8 text-4xl">🔊</button>
                </div>
            </div>
        </div>
    )
}