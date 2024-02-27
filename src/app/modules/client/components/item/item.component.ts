import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';



@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.chose.nativeElement.innerText = 'Choose Image';
    
  }


  @ViewChild ('choose') public chose!: ElementRef;

  #fb = inject(FormBuilder);
 
  
  public itemContract = this.#fb.group({
    name: [],
    amount: [],
    value: [],
    category: [],
    image: [],
  });

  category = ["tenis", "sapato", "chinelo"]

  submitItem() {
    alert("Cadastrado");
    console.log(this.itemContract)
  }

  setValueImg(novoValor: any) {
    const formGroup = this.itemContract.controls;
    formGroup.image.setValue(novoValor);

  }

  pegaImg(e: EventTarget | null, spanImg: HTMLSpanElement) {
    const inputValue = e as HTMLInputElement;
    const file: any = inputValue.files?.item(0);
    this.setValueImg(file?.name)
    console.log(file);

    if(file) {
      const reader = new FileReader();
      reader.addEventListener('load', function (e) {
        const readerTarget = e.target;
        console.log(readerTarget)
        const img = readerTarget?.result;
        spanImg.innerHTML = `<img width = '100%' height = '100%' src='${img}'>`;
      });
      reader.readAsDataURL(file);
    }
  }
}