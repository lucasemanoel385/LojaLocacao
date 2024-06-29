import { itensList } from "./itemsList";

export interface ContractEdit {
    contractId: number,
    clientId: number,
    dateOf: any,
    dateUntil: any,
    discount: number,
    items: itensList[],
    observation: string,
    annotations: string

}