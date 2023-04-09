
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';
import { DiaLogExcluirComponent } from '../template/info/dia-log-excluir/dia-log-excluir.component';
@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements AfterViewInit {

  veiculos: Veiculo[] = [];

  displayedColumns: string[] = ['id', 'modelo', 'marca', 'placa', 'ano', 'renavan', 'tamanho', 'action'];
  dataSource = new MatTableDataSource<Veiculo>(this.veiculos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: VeiculoService,
    private router: Router,
    public diaLog: MatDialog,
    private home: HomeService
  ) { }


  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.veiculos = resposta;
      this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
      this.dataSource.paginator = this.paginator;
      console.log(resposta);
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['veiculos/create'])
  }
  delet(id: any): void {
    
console.log(this.home.openDiaLog())
    if (confirm("Deseja excluir o veiculo?") == true) {

      this.service.delet(id).subscribe(resposta => {
        this.findAll();
        this.service.message("Veículo excluido")
      });

    } else {
      this.service.message("Nenhuma alteração feita")
    }


  }



}


