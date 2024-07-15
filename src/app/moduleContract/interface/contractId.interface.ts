import { ClientCreate } from "../../moduleClient/interface/clientCreate.interface";
import { PaymentsList } from "./PaymentsList";
import { ContractItens } from "./contractItens.interface";


export interface ContractId {
    id: number,
    client: ClientCreate,
    dateContract: Date,
    dateOf: Date,
    dateUntil: Date,
    discount: number,
    payment: PaymentsList[]
    seller: string,
    items: ContractItens[],
    value: number,
    valueTotal: number,
    contractSituation: string,
    observation: string,
    annotations: string
}