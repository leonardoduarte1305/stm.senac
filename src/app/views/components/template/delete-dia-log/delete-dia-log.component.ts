import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dia-log',
  templateUrl: './delete-dia-log.component.html',
  styleUrls: ['./delete-dia-log.component.css']
})
export class DeleteDiaLogComponent {


  constructor(public dialogRef: MatDialogRef<DeleteDiaLogComponent>) {}
}
