import { Category } from "./Category";
import { Item } from "./Item";
import { Pageable } from "./Pageable";

export interface ListItem {
        content: Item[],
        numberOfElements: number,
        totalElements: number,
        totalPages: number,
        size: number,
        number: number
}