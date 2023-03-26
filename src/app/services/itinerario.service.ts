import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(
    private snack: MatSnackBar
  ) { }


  mensagem(msg: String) {
    this.snack.open(`${msg}`,'Ok',{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:1000
    }
    )
  }


}
