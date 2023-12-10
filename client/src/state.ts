import { atom } from 'recoil';
import { Personality } from './types';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface PathTypes {
    path: { lat: number; lng: number; }[];
}

export interface CourseTypes {
    children: string;
    location: {
        latitude: number;
        longitude: number;
    },
    address: string;
    type: string;
    day: number;
    img: string;
    price: number;
    courseId?: number;
    title?: string;
    startDay?: number;
    finishDay?: number;
}
export interface PriceTypes {
    items: {
        title: string,
        foodName: string,
        day: number,
        price: number,
        type: string,
        img: string,
    }[],
    taxi: number,
    distance: number,
}
export const userState = atom<Personality>({
    key: 'user',
    default: {
        travel_destination: '',
        start_day: '',
        finish_day: '',
        travel_day: 0,
        rank_mountain: 0,
        rank_sea: 0,
        rank_historicalTheme: 0,
        rank_experienceTheme: 0,
        rank_buildingTheme: 0,
        rank_cafe: 0,
        rank_koreanfood: 0,
        rank_japanesefood: 0,
        rank_chinesefood: 0,
        rank_westernfood: 0,
        rank_fastfood: 0,
        rank_meat: 0,
        rank_hotel: 0,
        rank_motel: 0,
        rank_pension: 0,
    },
    effects_UNSTABLE: [persistAtom],
});
export const pathState = atom<PathTypes>({
    key: 'path',
    default: {
        path: [],
    },
    effects_UNSTABLE: [persistAtom],
});

export const courseState = atom<CourseTypes[]>({
    key: 'course',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const travelState = atom<string>({
    key: 'travel',
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const priceState = atom<PriceTypes>({
    key: 'price',
    default: {
        items: [],
        taxi: 0,
        distance: 0,
    },
    effects_UNSTABLE: [persistAtom],
})

export const dayState = atom<number>({
    key:' day',
    default: 1,
})