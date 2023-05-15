import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';
import { OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';



export interface DialogData {
  idSubscrib: any;
  name: string;

}



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
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private deleteDialog: DeleteDialogService
  ) { }

  idSubscrib!: any;
  name!: string;
  openDialog(id: any): void {
    this.idSubscrib = id;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, idSubscrib: this.idSubscrib },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idSubscrib = result;
    });
  }

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
  async delet(id: any) {

    const confirmed = await this.deleteDialog.open();

    if (confirmed == true) {
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
  takeId(id: any): void {


  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./sedes.component.css']
})

export class DialogOverviewExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private router: Router,
    private service: SedeService,
    private snack: MatSnackBar,
    public dialog: MatDialog


  ) { }
  nomeSede!: String;
  ngOnInit(): void {
    this.pegarNomeSede();
  }

  onNoClick(): void {

    this.dialogRef.close();
  }

  pegarNomeSede() {
    this.service.findById(this.data.idSubscrib).subscribe((resposta) => {
      this.nomeSede = resposta.nome;
    })
  }

  email!: any;
  emailValido!: string;
  inscrever(): void {
    var e: string[];

    this.email = document.getElementById("email");
    this.emailValido = this.email.value;
    console.log(this.emailValido + " id " + this.data.idSubscrib)
    e = [this.emailValido];

    this.service.inscrever(this.data.idSubscrib, e).subscribe((resposta) => {
      this.message("Foi inscrito na sede" + resposta)
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