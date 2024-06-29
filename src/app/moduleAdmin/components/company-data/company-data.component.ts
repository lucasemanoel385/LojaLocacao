
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataCompanyService } from '../service/data-company.service';
import { DataCompany } from '../interface/dataCompany.interface';
import { GetDataCompany } from '../interface/getDataCompany.interface';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-company-data',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './company-data.component.html',
  styleUrl: './company-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDataComponent implements OnInit{

  #apiDataCompanyService = inject(DataCompanyService);

  public getDataCompany = this.#apiDataCompanyService.getCompany;
  public getMsgError = this.#apiDataCompanyService.getMsgError;
  public getMsgSucess = this.#apiDataCompanyService.getMsgSucess;

  ngOnInit(): void {
    if(this.getDataCompany() === null) {
      this.#apiDataCompanyService.httpGetDataCompany$().subscribe((res) => this.updateValueTemplate(res));
    } else {
      this.updateValueTemplate(this.getDataCompany() as GetDataCompany);
    }
    
  }

  updateValueTemplate(res: GetDataCompany) {
    console.log(res);
    this.dataCompanyForm.setValue({
      reason: res.reason,
      fantasyName: res.fantasyName,
      cnpj: res.cnpj,
      street: res.street,
      number: res.number,
      district: res.district,
      cep: res.cep,
      city: res.city,
      uf: res.uf,
      phone1: res.phone1,
      phone2: res.phone2
    })

   
      const span: any = document.getElementById('img');
      span.innerHTML = `<img width = '100%' height = '100%' src='${res.imagem}'>`
  

  }

  #fb = inject(FormBuilder);

  public dataCompanyForm = this.#fb.group({
    reason: [''],
    fantasyName: [''],
    cnpj: [''],
    street: [''],
    number: [''],
    district : [''],
    cep: [''],
    city: [''],
    uf: [''],
    phone1: [''],
    phone2: ['']
  })

  selectedFile: File | undefined;

  onFileSelected(event: any, spanImg: HTMLSpanElement): void {
    const file = event.target.files[0] as File;
    this.selectedFile = file;
    if(file) {
      const reader = new FileReader();
      reader.addEventListener('load', function (e) {
        const readerTarget = e.target;
        const img = readerTarget?.result;
        spanImg.innerHTML = `<img width = '100%' height = '100%' src='${img}'>`;
      });
      reader.readAsDataURL(file);
    }
  }

  submit() {
    console.log(this.selectedFile)
    this.#apiDataCompanyService.httpUpdateDataCompany$(
      this.dataCompanyForm.value as DataCompany, this.selectedFile).subscribe();

    setTimeout(() => {
      this.getMsgSucess.set(null);
      this.getMsgError.set(null);
    }, 3000)  

  }

}
