import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-dia-log-excluir',
  templateUrl: './dia-log-excluir.component.html',
  styleUrls: ['./dia-log-excluir.component.css']
})
export class DiaLogExcluirComponent {
  constructor(public dialogRef: MatDialogRef<DiaLogExcluirComponent>,
    private home: HomeService) {

  }
 
}
