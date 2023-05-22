import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from 'src/app/models/material';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
import { MaterialService } from 'src/app/services/material.service';
import { CriarMaterialComponent } from '../criar-material/criar-material.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent implements OnInit {


  materiais: Material[] = [];

  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<Material>(this.materiais);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private service: MaterialService,
    private deleteDialog: DeleteDialogService,
    private dialog:MatDialog  
  ) {

  }
  ngOnInit(): void {
    this.buscarTodosMAteriais();
  }


  criarMaterial(): void {

    const dialogRef: MatDialogRef<CriarMaterialComponent> = this.dialog.open(CriarMaterialComponent, {
      width: '700px',
      height:'300px' 
      
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manipule o resultado do diálogo, se necessário
      this.buscarTodosMAteriais();
    });
  }
  buscarTodosMAteriais(): void {
    this.service.buscarMateriais().subscribe(res => {
      this.materiais = res;
      this.dataSource = new MatTableDataSource<Material>(this.materiais);

    })
  }
  async excluir(id: any) {
    const confirmed = await this.deleteDialog.open();

    if (confirmed == true) {

      this.service.delet(id).subscribe(res => {
        this.buscarTodosMAteriais();
      })
    } else {

    }


  }

}
