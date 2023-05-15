import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
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
    private router: Router,
    private deleteDialog: DeleteDialogService

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

  async delet(id: any) {

    const confirmed = await this.deleteDialog.open();

    if (confirmed == true) {
      this.servive.delet(id).subscribe(resposta => {
        this.findAll();
        this.servive.message("Motorista excluido")
      })
    } else {


      this.servive.message("Nenhuma alteração feita")
    }

  }
}
