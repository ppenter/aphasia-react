import { atom } from "recoil";

export const voicesState = atom<SpeechSynthesisVoice[] | undefined>({
  key: "voicesState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const voiceState = atom<SpeechSynthesisVoice | undefined>({
  key: "voiceState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const ttsState = atom<SpeechSynthesisUtterance | undefined>({
  key: "ttsState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const textState = atom<string>({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
