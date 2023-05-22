import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-criar-material',
  templateUrl: './criar-material.component.html',
  styleUrls: ['./criar-material.component.css']
})
export class CriarMaterialComponent {
  constructor(
    public dialogRef: MatDialogRef<CriarMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MaterialService
  ) { }
  material: Material = {
    descricao: "",
    id: null!,
    nome: ""
  }
  validar: boolean = false;
  isError: boolean = false;



  fecharDialog(): void {
    this.dialogRef.close();
  }
  criar(): void {
    if (this.material.nome == "") {
      this.validar = true;
      this.isError=true;
    } else {
      this.service.create(this.material).subscribe(res => {
        this.fecharDialog();
      })
    }

  }
}
