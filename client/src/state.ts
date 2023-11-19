import { atom } from 'recoil';

export interface PathTypes {
    path: { lat: number; lng: number; }[];
}

//recoil state 생성
export const pathState = atom<PathTypes>({
    key: 'path',
    default: {
        path: [],
    }
});