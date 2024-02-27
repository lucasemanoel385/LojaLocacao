import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-register-client',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './form-register-client.component.html',
  styleUrl: './form-register-client.component.scss'
})
export class FormRegisterClientComponent {

  @ViewChild("phone") public teste!: NgModel;

  public listComidas = signal<Array<{comida: string, preco: string}>>([
    {
      comida: 'X-salada', preco: 'R$10'
    },
    {
      comida: 'X-bacon', preco: 'R$11'
    },
    {
      comida: 'Coxinha', preco: 'R$6'
    }
]);

  public submitForm(form: NgForm){
    alert('Cadastrado com sucesso');
    if(form.valid) {
      console.log(form.value);
      console.log(this.teste)
    }
  }
}
