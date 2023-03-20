import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';

@Component({
  selector: 'app-motorista-create',
  templateUrl: './motorista-create.component.html',
  styleUrls: ['./motorista-create.component.css']
})
export class MotoristaCreateComponent {


  motorista: Motorista = {
    nome: "",
    categoriaCarteira: "",
    email: ""
  }

  constructor(
    private router: Router,
    private servico: MotoristaService
  ) { }

  create(): void {
    this.servico.create(this.motorista).subscribe((resposta) => {
      this.router.navigate(['motoristas']);
    })
  }
  cancelar():void{
    this.router.navigate(['motoristas']);
  }
}
