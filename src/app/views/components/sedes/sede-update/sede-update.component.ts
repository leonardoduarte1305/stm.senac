import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-sede-update',
  templateUrl: './sede-update.component.html',
  styleUrls: ['./sede-update.component.css']
})
export class SedeUpdateComponent implements OnInit {

  id_sede = "";
  sede: Sede = {
    id: null!,
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
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_sede = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }
  findById(): void {
    this.service.findById(this.id_sede).subscribe(resposta => {
      this.sede = resposta;
    })
  }
  update(): void {
    this.service.update(this.sede).subscribe(resposta => {
      this.router.navigate(['sedes']);
      this.message("Sede atualizada")
    }
    )
  }


  navigationToSedes() {
    this.router.navigate(['sedes']);
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
