import { ClientCreate } from './../../interface/clientCreate.interface';
import { Cep } from './../../interface/cep.interface';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientService } from '../../service/client.service';
import { concatMap } from 'rxjs';
import { UpdateClient } from '../../interface/updateClient.interface';
import { Router } from '@angular/router';
import { BackHistoryComponent } from '../../../componentsTemplate/back-history/back-history.component';



@Component({
  selector: 'app-form-register-client',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, BackHistoryComponent],
  templateUrl: './form-register-client.component.html',
  styleUrl: './form-register-client.component.scss'
})
export class FormRegisterClientComponent implements OnChanges, OnInit {
  

  @ViewChild('formRegister') form!: NgForm;
  @ViewChild("type") public typePerson!: NgModel;

  idUpdateClient = signal<number | null>(null);
  
  tittle = signal('Cadastrar cliente');
  buttonSubmit = signal('Cadastrar');

  @Input() tittleClient!: string;
  @Input() buttonSave!: string;
  @Input() client!: string;
  //Pega uma lista de formulario
  //@ViewChildren('formElem', {read: ElementRef}) myFormElems: QueryList<ElementRef>;

  #serviceClient = inject(ClientService);

  #router = inject(Router);

  public getClientMsgSucess = this.#serviceClient.getClientMsgSucess;
  public getClientError = this.#serviceClient.getClientError;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tittleClient'].currentValue) {
      this.buttonSubmit.set(changes['buttonSave'].currentValue);
      this.tittle.set(changes['tittleClient'].currentValue);
      this.idUpdateClient.set(changes['client'].currentValue);
      this.#serviceClient.httpGetClientId(changes['client'].currentValue).subscribe((res) => this.editCLient(res));
    }

   }

  ngOnInit(): void {
    this.getClientMsgSucess.set("");
    this.getClientError.set("");
   }

  nameReason = signal('Nome:');
  cpfCnpj = signal('CPF:');
  rgInsc = signal('RG:');
  dateBirthC = signal('Data de Nascimento:')

  public setPerson(person?: string) {

    if(this.typePerson.value === "Jurídica" || person === "Jurídica") {
      this.nameReason.set('Razão:');
      this.cpfCnpj.set('CNPJ:');
      this.rgInsc.set('Insc. Estadual');
      this.dateBirthC.set('Constituição da Empresa:');

    } else {
      this.nameReason.set('Nome:');
      this.cpfCnpj.set('CPF:');
      this.rgInsc.set('RG:');
      this.dateBirthC.set('Data de Nascimento:');

    }
  }

  public queryCep(cep: string ,formRegister: NgForm) {

    this.#serviceClient.httpGetCep(cep).subscribe((dados) => this.attAddress(dados, formRegister));

  }

  private editCLient(data: ClientCreate) {

    var yyyy: string = data.dateBirthCompanyFormation[0];
    var MM: string = data.dateBirthCompanyFormation[1];
    var dd: string = data.dateBirthCompanyFormation[2];

    var cpf: string = data.cpfCnpj;

    var person;

    if(cpf.length > 13) {
      person = 'Jurídica'
    } else {
      person = 'Física'
    }

    this.setPerson(person);
  
    this.form.control.patchValue({
      type: person,
      name: data.nameReason,
      cpf: data.cpfCnpj,
      rg: data.rgStateRegistration,
      dateBirth: yyyy + "-" + MM + "-" + dd,
      cep: data.address.cep,
      street: data.address.street,
      city: data.address.city,
      district: data.address.district,
      uf: data.address.uf,
      number: data.address.number,
      phone1: data.phone1,
      phone2: data.phone2,
      email: data.email,
    })
 

  }

  public attAddress(dados: Cep, formRegister: NgForm) {
    console.log(formRegister)
    formRegister.control.patchValue({
      cep: dados.cep,
      street: dados.logradouro,
      city: dados.localidade,
      district: dados.bairro,
      uf: dados.uf
    })

  }

  public submitForm(form: NgForm){

    if(this.buttonSave === "Salvar") {
      const client: UpdateClient = {
        id: this.idUpdateClient() as number,
        /*name: form.control.get('name')?.value,
        cpf: form.control.get('cpf')?.value,
        rg: form.control.get('rg')?.value,
        dateBirth: form.control.get('dateBirth')?.value,*/
        street: form.control.get('street')?.value,
        district: form.control.get('district')?.value,
        cep: form.control.get('cep')?.value,
        number: form.control.get('number')?.value,
        city: form.control.get('city')?.value,
        uf: form.control.get('uf')?.value,
        email: form.control.get('email')?.value,
        phone1: form.control.get('phone1')?.value,
        phone2: form.control.get('phone2')?.value,
        
      }
      this.#serviceClient.httpUpdateClient(client).pipe(
        concatMap( () => this.#serviceClient.httpGetClient())
        ).subscribe();
        setTimeout(() => this.#router.navigate(['/clients']), 2000)
      
    } else {
        console.log(form.value as ClientCreate)
        this.#serviceClient.httpCreateClient(form.value as ClientCreate).pipe(
        concatMap( () => this.#serviceClient.httpGetClient())
        ).subscribe();
        setTimeout(() => this.#router.navigate(['/clients']), 2000)
    }
  }
}
