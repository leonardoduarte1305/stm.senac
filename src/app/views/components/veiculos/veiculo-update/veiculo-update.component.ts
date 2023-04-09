import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { SnackBarComponent } from '../../template/snack-bar/snack-bar.component';

@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.css']
})
export class VeiculoUpdateComponent implements OnInit {

  id_veiculo = "";

  veiculo: Veiculo = {
    id: null!,
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
    private stick: MatSnackBar,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.id_veiculo = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }
  findById():void {
    this.service.findbyId(this.id_veiculo).subscribe(resposta => {
      this.veiculo = resposta;
      console.log(resposta)
    })
  }

  cancelar(): void {
    this.router.navigate(['veiculos']);
  }
  update():void{
    this.service.update(this.veiculo).subscribe(resposta=>{
      this.router.navigate(['veiculos'])
      this.service.message("Veículo Criado!")
    })
  }

  open() {
    this.stick.openFromComponent(SnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
