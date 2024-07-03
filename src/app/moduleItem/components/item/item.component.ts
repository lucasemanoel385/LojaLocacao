
import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject, input, signal } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ProductService } from '../../service/product.service';
import { Item } from '../../interface/Item';
import { ItemUpdate } from '../../interface/ItemUpdate';

import { ItemCreate } from '../../interface/ItemCreate';
import { BackHistoryComponent } from '../../../componentsTemplate/back-history/back-history.component';
import { CategoryItemService } from '../../../moduleCategory/service/categoryItem.service';
import { concat, concatMap } from 'rxjs';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxMaskDirective, BackHistoryComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.#apiServiceCategory.httpGetListCategory().subscribe();
  }

  @Input() tittleItem!: string;
  @Input() buttonSave!: string;
  @Input() idItem!: string;

  tittle = signal('Cadastrar produto');
  buttonSubmit = signal('Cadastrar');
  idProduct = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tittleItem'].currentValue) {
      this.idProduct.set(changes['idItem'].currentValue);
      this.tittle.set(changes['tittleItem'].currentValue);
      this.buttonSubmit.set(changes['buttonSave'].currentValue);
      this.#apiServiceItem.httpGetItemId$(changes['idItem'].currentValue).subscribe(() => this.editItem());
    }
  }

  #fb = inject(FormBuilder);
 
  #apiServiceItem = inject(ProductService);
  #apiServiceCategory = inject(CategoryItemService)

  public getCategorys = this.#apiServiceCategory.getListCategory;
  public getItemError$ = this.#apiServiceItem.getItemError;
  public getItemMsgSucess$ = this.#apiServiceItem.getItemSucess;


  isReadOnlyCodItem = signal(false);
  selectedFile: File | undefined;

  onFileSelected(event: any, spanImg: HTMLSpanElement): void {
    const file = event.target.files[0] as File;
    this.selectedFile = file;
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
    console.log(this.selectedFile)
  }

  @ViewChild('choose') spanImg!: ElementRef;
  @ViewChild('cod') codItem!: ElementRef;

  public getItemId = this.#apiServiceItem.getItemId;

  editItem() {
    this.isReadOnlyCodItem.set(true);
    var data = this.getItemId() as Item;
    console.log(data)
    this.itemContract.patchValue({
      cod: data.cod.toString(),
      name: data.name,
      value: data.value.toString().replace('.',','),
      replacementValue: data.replacementValue.toString().replace('.',','),
      amount: data.amount.toString(),
      category: data.category.name,
    })
   
    this.spanImg.nativeElement.innerHTML = `<img width = '100%' height = '100%' src='${data.imagem}'>`;
  }
  
  public itemContract = this.#fb.group({
    cod: [''],
    name: [''],
    value: [''],
    replacementValue: [''],
    amount: [''],
    category: [''],
 
  });

  public formImg = this.#fb.group({
    imagem: []
  });

  submitItem() {

    this.itemContract.patchValue({
      value: this.itemContract.get('value')?.value?.replace(',', '.'),
      replacementValue: this.itemContract.get('replacementValue')?.value?.replace(',', '.'),
    })

    if(this.buttonSubmit() === "Salvar") {

      const item: ItemUpdate = {
        id: Number(this.idProduct()),
        cod: Number(this.itemContract.get('cod')?.value),
        name: this.itemContract.get('name')?.value as string,
        value: Number(this.itemContract.get('value')?.value),
        replacementValue: Number(this.itemContract.get('replacementValue')?.value),
        amount: Number(this.itemContract.get('amount')?.value),
        category: this.itemContract.get('category')?.value as string,
      }
      console.log(this.itemContract.value, this.selectedFile)
      this.#apiServiceItem.httpUpdateItem$(item, this.selectedFile).pipe(
        concatMap(() => this.#apiServiceItem.httpGetItems$())
      ).subscribe();

      setTimeout(() => {
        this.getItemError$.set(null);
        this.getItemMsgSucess$.set(null);
      }, 5000)

    } else if (this.buttonSubmit() === "Cadastrar") {
      const item: ItemCreate = {
        cod: Number(this.itemContract.get('cod')?.value),
        name: this.itemContract.get('name')?.value as string,
        value: Number(this.itemContract.get('value')?.value),
        replacementValue: Number(this.itemContract.get('replacementValue')?.value),
        amount: Number(this.itemContract.get('amount')?.value),
        category: this.itemContract.get('category')?.value as string,
      }

      this.#apiServiceItem.httpCreateItem$(item, this.selectedFile).pipe(
        concatMap(() => this.#apiServiceItem.httpGetItems$())
      ).subscribe();

      setTimeout(() => {
        this.getItemError$.set(null);
        this.getItemMsgSucess$.set(null);
      }, 5000)
    }
   };
   
}