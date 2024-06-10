import { Category } from "./Category";

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