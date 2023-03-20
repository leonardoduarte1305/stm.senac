import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  displayedColumns: string[] = ['rua', 'numero', 'cep', 'cidade', 'uf', 'nome', 'observacao'];
  dataSource = new MatTableDataSource<Sede>(this.sedes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private router: Router,
    private service: SedeService
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


}
