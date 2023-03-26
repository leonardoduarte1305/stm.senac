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
    rua: "",
    numero: null!,
    cep: "",
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
    this.message("Sede salva!")
    console.log(this.sede)
    this.service.create(this.sede).subscribe((resposta) => {
      this.message("Sede salva!")
      this.router.navigate(['sedes'])
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

