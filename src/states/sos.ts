import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const sosState = atom<any>({
  key: "sosState",
  default: undefined,
});
