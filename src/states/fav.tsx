import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const favoriteState = atom<Array<any>>({
    key: 'favoriteState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});