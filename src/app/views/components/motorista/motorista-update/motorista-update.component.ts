import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';

@Component({
  selector: 'app-motorista-update',
  templateUrl: './motorista-update.component.html',
  styleUrls: ['./motorista-update.component.css']
})
export class MotoristaUpdateComponent {

  
  
  motorista: Motorista = {
    nome: "",
    categoriaCarteira: "",
    email: ""
  }

  constructor(
    private router: Router,
    private servico: MotoristaService
  ) { }

  cancelar(): void {
    this.router.navigate(['motoristas']);
  }

}
