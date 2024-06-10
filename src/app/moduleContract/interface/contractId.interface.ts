import { ClientCreate } from "../../moduleClient/interface/clientCreate.interface";
import { ContractItens } from "./contractItens.interface";


export interface ContractId {
    id: number,
    client: ClientCreate,
    dateOf: Date,
    dateUntil: Date,
    discount: number,
    phone: string,
    seller: string,
    items: ContractItens[],
    value: number,
    valueTotal: number,
    valuePaid: number,
    contractSituation: string,
    observation: string,
    annotations: string
}