export interface Room {
    id?: number;
    name: string;
    description: string;
    photo: string;
    location: string;
    categoryId: number;
    category?: string;
}