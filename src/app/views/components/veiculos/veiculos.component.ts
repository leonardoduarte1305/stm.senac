
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements AfterViewInit {

veiculos: Veiculo[]=[];

  displayedColumns: string[] = ['modelo', 'marca', 'placa', 'ano','renavan','tamanho'];
  dataSource = new MatTableDataSource<Veiculo>(this.veiculos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : VeiculoService,
    private router: Router
    ){

  }

  ngAfterViewInit() {
    this.findAll();

  }

findAll():void{
this.service.findAll().subscribe((resposta)=>{
  this.veiculos= resposta;
  this. dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
  this.dataSource.paginator = this.paginator;
  console.log(resposta);
})
}

navigateToCreate():void{
this.router.navigate(['veiculo/create'])
}
}


