import { ClientCreate } from "../../moduleClient/interface/clientCreate.interface";
import { PaymentsList } from "./PaymentsList";
import { ContractItens } from "./contractItens.interface";


export interface ContractId {
    id: number,
    client: ClientCreate,
    dateOf: Date,
    dateUntil: Date,
    discount: number,
    phone: string,
    payment: PaymentsList[]
    seller: string,
    items: ContractItens[],
    value: number,
    valueTotal: number,
    contractSituation: string,
    observation: string,
    annotations: string
}