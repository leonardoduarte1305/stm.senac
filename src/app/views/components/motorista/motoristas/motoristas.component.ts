import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent implements AfterViewInit {

  motoristas: Motorista[] = [];

  displayedColumns: string[] = ['id', 'nome', 'carteira', 'email', 'action'];
  dataSource = new MatTableDataSource<Motorista>(this.motoristas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servive: MotoristaService,
    private router: Router

  ) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.servive.findAll().subscribe((resposta) => {
      this.motoristas = resposta;
      this.dataSource = new MatTableDataSource<Motorista>(this.motoristas);
      this.dataSource.paginator = this.paginator;
      console.log(resposta);
    })
  }
  navigationToCreate(): void {
    this.router.navigate(['motoristas/create']);
  }

  delet(id: any): void {
    if (confirm("Deseja excluir o motorista") == false) {
      this.servive.message("Nenhuma alteração feita")
    } else {

      this.servive.delet(id).subscribe(resposta => {
        this.findAll();
        this.servive.message("Motorista excliuso")
      })
    }
  }
}
