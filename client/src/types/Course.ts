export interface Course {
    address: string;
    day: number,
    location: {
        latitude: number,
        longitude: number;
    }
    name: string;
    type: string;
    price: number;
}