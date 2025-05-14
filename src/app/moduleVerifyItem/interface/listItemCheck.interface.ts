import { ItemsAvailable } from "./ItemsAvailable.interface";


export interface ListItemCheck {
    content: ItemsAvailable[],
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    page?: number
}