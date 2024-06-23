import { ChangeDetectionStrategy, Component, OnInit, inject, Input, OnChanges, SimpleChanges, ViewChild, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CategoryItemService } from '../../service/categoryItem.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CategoryCreate } from '../../interface/categoryCreate.interface';
import { CategoryList } from '../../interface/categoryList.interface';
import { BackHistoryComponent } from '../../../componentsTemplate/back-history/back-history.component';


@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, BackHistoryComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.getCreateCategory.set("");
    this.getCreateCategoryError.set("");
   }

  @ViewChild('formRegister') form!: NgForm;
 
  @Input() idCategory!: string;
  @Input() tittleCategory!: string;
  @Input() buttonSave!: string;

  tittle = signal('Cadastrar categoria');
  buttonSubmit = signal('Cadastrar');

  idUpdateCategory = signal<number | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tittleCategory'].currentValue) {
      this.tittle.set(changes['tittleCategory'].currentValue);
      this.buttonSubmit.set(changes['buttonSave'].currentValue);
      this.idUpdateCategory.set(changes['idCategory'].currentValue);
      this.#serviceCategory.httpGetCategoryId(changes['idCategory'].currentValue).subscribe((res) => this.editCategory(res));
    }

  }

  #serviceCategory = inject(CategoryItemService);
  #router = inject(Router)

  public getCreateCategory = this.#serviceCategory.getCreateCategory;
  public getCreateCategoryError = this.#serviceCategory.getCreateCategoryError;
  
  public editCategory(data: CategoryCreate) {
    console.log(data);
    this.form.control.patchValue({
      category: data.category
    })
  }

  public submitForm(form: NgForm){

    if(this.buttonSave === "Salvar") {
      const category: CategoryList = {
        id: this.idUpdateCategory() as number,
        category: form.control.get('category')?.value
      }
      this.#serviceCategory.httpUpdateCategory(category).pipe(
        concatMap(() => this.#serviceCategory.httpGetListCategory())
      ).subscribe();
      setTimeout(() => {
        this.getCreateCategory.set(null),
        this.getCreateCategoryError.set(null)
      }, 3000)

    } else {
      this.#serviceCategory.httpCreateCategory(form.value).pipe(
        concatMap(() => this.#serviceCategory.httpGetListCategory())
      ).subscribe();
      setTimeout(() => {
        this.getCreateCategory.set(null),
        this.getCreateCategoryError.set(null)
      }, 3000)
    }
    }

  

  public backRouter() {
    //this.#router.navigate(['/category']);
    window.history.back();
  }
}
