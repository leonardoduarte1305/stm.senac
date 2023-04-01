import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SnackBarComponent } from '../../template/snack-bar/snack-bar.component';



@Component({

  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {



  veiculo: Veiculo = {
    id:null!,
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    renavan: "",
    tamanho: ""
  }

  modelo = new FormControl('', [Validators.required, Validators.nullValidator]);
  marca = new FormControl('', [Validators.required, Validators.nullValidator]);



  ngOnInit(): void {

  }
  constructor(
    private router: Router,
    private service: VeiculoService,
    private stick : MatSnackBar
  ) {

  }
  create(): void {
    let x = document.getElementsByTagName('input');
    if (this.veiculo.modelo.trim() === "" || this.veiculo.marca.trim() == "") {
      this.service.message('Deve preencher todos os campos obrigatorios');
      for (let i = 0; x.length-1 > i; i++) {
        x[i].style.borderBottomColor = 'red';
   
      }
    }else{
      for (let i = 0; x.length-1 > i; i++) {
        x[i].style.borderBottomColor = 'green';
      }
    }


    console.log(this.veiculo)
    this.service.create(this.veiculo).subscribe((resposta) => {
      this.router.navigate(['veiculos'])
      this.service.message("Veículo Criado!")
    }
    )
  }
  cancelar(): void {
    this.router.navigate(['veiculos']);
  }


  validationModelo() {
    if (this.modelo.invalid) {
      return 'o campo modelo é obrigatorio';
    }
    return false
  }

  open(){
    this.stick.openFromComponent(SnackBarComponent,{
      duration:1000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}
