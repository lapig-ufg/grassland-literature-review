import {Component, Input} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1, visibility: 'visible' })),
      state('hidden', style({ opacity: 0, visibility: 'hidden' })),
      transition('visible <=> hidden', animate('400ms ease-in-out')),
    ])
  ]
})
export class LoadingCompComponent {
  state: 'visible' | 'hidden';

  @Input() set show(value: boolean){
    this.state = value ? 'visible' : 'hidden';
  }
  constructor() {
    this.state = 'hidden';
  }
}
