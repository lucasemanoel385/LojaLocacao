import { Category } from "./Category";
import { Pageable } from "./Pageable";

export interface Item {
        cod: number,
        name: string,
        replacementValue: number,
        amount: number,
        imagem: string,
        category: Category,
}