import React, { PropsWithChildren, useEffect } from "react";
import useSound from "use-sound";
import Siren from "./siren.mp3";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const SosPage: React.FC<PropsWithChildren> = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [play, { pause, stop }] = useSound(Siren, {
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
  });

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
      toast.error("SOS signal sent to your emergency contacts");
    }
    setIsPlaying(!isPlaying);
  };

  const location = useLocation();
  useEffect(() => {

    const handleRouteChange = () => {
      stop();
    };

    // Listen for the route change event
    window.addEventListener("beforeunload", handleRouteChange);

    return () => {
      stop();
      setIsPlaying(false);
      // Remove
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [location.pathname, play, stop]);

  return (
    <div className="flex flex-col h-full pt-12" onClick={togglePlay}>
      {isPlaying ? (
        <img src="./images/siren.gif" />
      ) : (
        <img src="./images/siren-off.gif" />
      )}
    </div>
  );
};
