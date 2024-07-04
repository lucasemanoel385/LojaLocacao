import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-arrow-select',
  standalone: true,
  imports: [],
  templateUrl: './arrow-select.component.html',
  styleUrl: './arrow-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowSelectComponent {

  ulActive!: HTMLElement;
  currentIndexLi = 0;

  arrowSelect(keydown: KeyboardEvent, ulList: string) {

    const ul: HTMLElement = document.getElementById(ulList) as HTMLElement;
    const items = ul.getElementsByTagName('li');
    this.ulActive = ul;
    
    setTimeout(() => {
        items[this.currentIndexLi].classList.add('active');
    }, 50)

    if(keydown.key === "Backspace") {
      items[this.currentIndexLi].classList.remove('active');
    } else if(keydown.key === "ArrowDown") {
        keydown.preventDefault();
        this.moveFocus(1);
        items[this.currentIndexLi].scrollIntoView();
    } else if (keydown.key === "ArrowUp") {
      keydown.preventDefault();
      this.moveFocus(-1);
      items[this.currentIndexLi].scrollIntoView();
    } else if (keydown.key === "Enter") {
      items[this.currentIndexLi].focus();
      this.currentIndexLi = 0;
    }

  }

  moveFocus(delta: number) {
    const items = this.ulActive.getElementsByTagName('li');
    items[this.currentIndexLi].classList.remove('active');
    this.currentIndexLi = (this.currentIndexLi + delta + items.length) % items.length;
    items[this.currentIndexLi].classList.add('active');

}

}
