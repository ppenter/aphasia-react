import React, { PropsWithChildren } from "react";
import useSound from 'use-sound'
import Siren from './siren.mp3'
import { toast } from "react-toastify";

export const SosPage: React.FC<PropsWithChildren> = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);

  const [playBoop, {pause}] = useSound(Siren, {
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
  });

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      playBoop();
      toast.error('SOS signal sent to your emergency contacts')
    }
    setIsPlaying(!isPlaying);
  }
    return(
        <div className="flex flex-col h-full pt-12" onClick={togglePlay}>
            {
                isPlaying ? <img src="./images/siren.gif"/> : <img src="./images/siren-off.gif"/>
            }
        </div>
    )
}