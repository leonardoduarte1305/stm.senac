import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {

 


veiculo:Veiculo={
  modelo: "",
  marca: "",
  placa: "".toUpperCase(),
  ano:"" ,
  renavan:"" ,
  tamanho: ""
}
ngOnInit(): void {
  
}
constructor(
  private router:Router,
  private service: VeiculoService
){

}
create():void{
  this.veiculo.placa.toUpperCase();
  this.service.create(this.veiculo).subscribe((resposta)=>{
    this.router.navigate(['veiculos'])
    alert("Veículo cadastrado")
  })
}
cancelar():void{
  this.router.navigate(['veiculos']);
}
}
