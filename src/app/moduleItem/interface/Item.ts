import { Category } from "./Category";
import { Pageable } from "./Pageable";

export interface Item {
        cod: number,
        reference: string,
        name: string,
        url: string,
        replacementValue: string,
        amount?: number,
        quantity?: number,
        category: Category,
        image?: string,
}