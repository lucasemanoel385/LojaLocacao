import { itensList } from "./itemsList";

export interface ContractCreate {
    client: number,
    dateOf: any,
    dateUntil: any,
    discount: number,
    contactPhone: string,
    seller: string,
    items: itensList[],
    observation: string,
    annotations: string
}