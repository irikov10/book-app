export interface Book {
    username?: string;
    title: string;
    author: string;
    summary: string;
    information: string;
    price: string;
    image: string;
    _id?: string;
    _ownerId: string;
    // userId: string;
}