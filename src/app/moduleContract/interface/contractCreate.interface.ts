import { itensList } from "./itemsList";

export interface ContractCreate {
    client: number,
    dateOf: any,
    dateUntil: any,
    discount: number,
    seller: string,
    items: itensList[],
    observation: string,
    annotations: string
}