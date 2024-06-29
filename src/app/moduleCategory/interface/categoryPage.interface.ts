import { CategoryList } from "./categoryList.interface";

export interface CategoryPage {
    content: CategoryList[],
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number
}