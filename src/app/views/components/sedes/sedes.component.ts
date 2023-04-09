import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';




@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements AfterViewInit {

  sedes: Sede[] = [];

  displayedColumns: string[] = ['id', 'nome', 'numero', 'cep', 'cidade', 'uf', 'rua', 'observacao', 'action'];
  dataSource = new MatTableDataSource<Sede>(this.sedes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private router: Router,
    private service: SedeService,
    private snack: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.sedes = resposta;

      this.dataSource = new MatTableDataSource<Sede>(this.sedes);
      this.dataSource.paginator = this.paginator;
    })

  }


  navigateToCreate(): void {
    this.router.navigate(['sede/create'])
  }
  delet(id: any): void {
    if (confirm("deseja excluir a sede") == true) {

      this.service.delet(id).subscribe(resposta => {
        this.findAll();
        this.message("Sede excluida com sucesso")
      })
    } else {
      this.message("Nenhuma alteração feita")
    }
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
