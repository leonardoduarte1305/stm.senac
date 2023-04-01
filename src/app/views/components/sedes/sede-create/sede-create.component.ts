import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-sede-create',
  templateUrl: './sede-create.component.html',
  styleUrls: ['./sede-create.component.css']
})
export class SedeCreateComponent {

  mask() {

  }

  sede: Sede = {
    id:null!,
    rua: "",
    numero: null!,
    cep: null!,
    cidade: "",
    uf: "",
    nome: "",
    observacao: ""
  }

  constructor(
    private router: Router,
    private service: SedeService,
    private snack: MatSnackBar
  ) { }

  navigationToSedes() {
    this.router.navigate(['sedes']);
  }

  create(): void {
  
    console.log(this.sede)
    this.service.create(this.sede).subscribe((resposta) => {
      this.router.navigate(['sedes'])
      this.message("Sede salva!")
    })
  }


  message(msg: String): void {

    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ["barr"]

    })
  }

}

