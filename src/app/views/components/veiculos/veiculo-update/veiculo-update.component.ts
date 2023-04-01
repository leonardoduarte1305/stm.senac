import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SnackBarComponent } from '../../template/snack-bar/snack-bar.component';

@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.css']
})
export class VeiculoUpdateComponent {

  
  veiculo: Veiculo = {
    id:null!,
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    renavan: "",
    tamanho: ""
  }

  constructor(
    private router: Router,
    private service: VeiculoService,
    private stick : MatSnackBar
  ) {

  }
 
  cancelar(): void {
    this.router.navigate(['veiculos']);
  }

  open(){
    this.stick.openFromComponent(SnackBarComponent,{
      duration:1000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}
