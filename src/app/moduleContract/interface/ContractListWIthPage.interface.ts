import { ContractList } from "./contractList.interface";

export interface ContractListWithPage {
    content: ContractList[],
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number
}