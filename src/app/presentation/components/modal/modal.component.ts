import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnDestroy, OnInit {
  @Input() id!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>)
    //so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.element.addEventListener('click', (el: any) => {
      if (el.target.id === 'baseModal') {
        this.close();
      }
    });

    // add self (this modal instance)
    //to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    console.log(this.element)
    const idDiv = this.element.querySelector('#baseModal');
    const idBack = this.element.querySelector('#backDrop');

    if (idDiv) {
      this.renderer.removeClass(idDiv, 'hidden');
      this.renderer.addClass(idDiv, 'flex');
    }
    if(idBack){
      this.renderer.removeClass(idBack, 'hidden');
    }
  }

  // close modal
  close(): void {
    const idDiv = this.element.querySelector('#baseModal');
    const idBack = this.element.querySelector('#backDrop');
    if (idDiv) {
      this.renderer.removeClass(idDiv, 'flex');
      this.renderer.addClass(idDiv, 'hidden');
    }
    if(idBack){
      this.renderer.addClass(idBack, 'hidden');
    }
  }
}
