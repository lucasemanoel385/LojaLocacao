import { ClientList } from "./clientList.interface";

export interface ClientPage {
    content: ClientList[],
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number
    
}