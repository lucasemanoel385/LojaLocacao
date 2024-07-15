import { itensList } from "./itemsList";

export interface ContractEdit {
    contractId: number,
    clientId: number,
    dateOf: any,
    dateUntil: any,
    discount: number,
    items: itensList[],
    seller: string,
    observation: string,
    annotations: string

}