import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';

@Component({
  selector: 'app-motorista-create',
  templateUrl: './motorista-create.component.html',
  styleUrls: ['./motorista-create.component.css']
})
export class MotoristaCreateComponent implements OnInit {

  motoristaForm!: FormGroup;

  motorista: Motorista = {
    id: null!,
    nome: "",
    carteira: "",
    email: ""
  }

  constructor(
    private router: Router,
    private servico: MotoristaService
  ) { }

  ngOnInit(): void {
    this.motoristaForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('',[Validators.required, Validators.pattern(/\S/)]),
      carteira: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required, Validators.pattern(/\S/)]),

    })
  }
  get nome(){
    return this.motoristaForm.get('nome')!;
  }
  get carteira(){
    return this.motoristaForm.get('carteira')!;
  }
  get email(){
    return this.motoristaForm.get('email')!;
  }

  create(): void {
    if(this.motoristaForm.invalid){
      console.log("Nada feito")
      return;
    }
    console.log(this.motorista)
    this.servico.create(this.motorista).subscribe((resposta) => {
      this.router.navigate(['motoristas']);
      this.servico.message('Motorista Salvo');
    })
  }
  cancelar(): void {
    this.router.navigate(['motoristas']);
  }

  categoriasCarteira: string[] = [
    '',
    'A', // Moto
    'B', // Carro
    'C', // Caminhão
    'D', // Ônibus
    'E', // Carreta
    'AB', // Carro e Moto
    'AC', // Ônibus e Caminhão
    'AD', // Ônibus e Carreta
    'AE', // Carreta com mais de 6 eixos
  ];

  submit() {

  }
}
