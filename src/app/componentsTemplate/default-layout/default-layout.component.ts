import { ChangeDetectionStrategy, Component, ElementRef, Input, signal, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ComponentsNavComponent } from '../../components-nav/components-nav.component';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [ComponentsNavComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent implements OnInit {
  ngOnInit(): void {
    if (!sessionStorage.getItem('img')) {
        this.srcImg.set("../../../assets/seta-esquerda.png");
    }
  }
  
  @Input({ required: true}) nameTitle!: string;
  @Input() styleBackground!: string;

  srcImg = signal(sessionStorage.getItem('img'));
  displayMenu = signal(sessionStorage.getItem('display'));
  
  swapImg(section: HTMLElement): void {

    if(this.srcImg() === "../../../assets/seta-esquerda.png") {
      section.style.display = 'none';
      this.srcImg.set("../../../assets/seta-direita.png");
      sessionStorage.setItem('img', '../../../assets/seta-direita.png');
      sessionStorage.setItem('display', 'display: none;');

      
    } else {
      section.style.display = 'flex';
      this.srcImg.set("../../../assets/seta-esquerda.png");
      sessionStorage.setItem('img', '../../../assets/seta-esquerda.png');
      sessionStorage.setItem('display', 'display: flex;');

    }
  
  }

  hideSideBar(section: HTMLElement) {
    const width = window.innerWidth;
    if(width < 733) {
      section.style.display = 'none';
      this.srcImg.set("../../../assets/seta-direita.png");
      sessionStorage.setItem('img', '../../../assets/seta-direita.png');
      sessionStorage.setItem('display', 'display: none;');
    }
  }


}
