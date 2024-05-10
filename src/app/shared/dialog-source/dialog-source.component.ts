import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';


import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dialog-source',
  templateUrl: './dialog-source.component.html',
  styleUrl: './dialog-source.component.scss',
  standalone: true,
  imports: [MatDialogModule, FontAwesomeModule, CommonModule,DialogModule, ImageModule],
})
export class DialogSourceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any){}
}
