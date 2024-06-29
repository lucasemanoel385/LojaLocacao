import { Address } from "./Address.interface"


export interface ClientCreate {
    id: number,
    nameReason: string,
    cpfCnpj: string,
    rgStateRegistration: string,
    dateBirthCompanyFormation: any,
    address: Address,
    email: string,
    phone1: string,
    phone2: string
    
}