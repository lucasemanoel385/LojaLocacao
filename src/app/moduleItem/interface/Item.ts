import { Category } from "./Category";
import { Pageable } from "./Pageable";

export interface Item {
        id: number,
        cod: number,
        name: string,
        value: number,
        replacementValue: number,
        amount: number,
        imagem: string,
        category: Category,
}