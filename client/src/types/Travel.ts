export interface Travel {
    name: string;
    rating: number;
    address: string;
    type: string;
    category: string;
    image_url: string;
    location: {
        latitude: number,
        longitude: number;
    }
}