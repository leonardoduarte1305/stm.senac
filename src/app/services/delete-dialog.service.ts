import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDiaLogComponent } from '../views/components/template/delete-dia-log/delete-dia-log.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {
  constructor(private dialog: MatDialog) { }

  open(): Promise<boolean> {
    const dialogRef = this.dialog.open(DeleteDiaLogComponent);

    return dialogRef.afterClosed().toPromise();
  }
}
