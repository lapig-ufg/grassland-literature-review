import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
  import { Source } from '../../interface/source';

import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dialog-source',
  templateUrl: './dialog-source.component.html',
  styleUrl: './dialog-source.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FontAwesomeModule],
})
export class DialogSourceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Source){}
}
