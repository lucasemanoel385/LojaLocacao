import { Category } from "./Category";
import { Pageable } from "./Pageable";

export interface Item {
        cod: number,
        reference: string,
        name: string,
        replacementValue: string,
        amount: number,
        imagem: string,
        category: Category,
}