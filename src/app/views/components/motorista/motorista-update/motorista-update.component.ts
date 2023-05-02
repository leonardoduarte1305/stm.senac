import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-motorista-update',
  templateUrl: './motorista-update.component.html',
  styleUrls: ['./motorista-update.component.css']
})
export class MotoristaUpdateComponent implements OnInit {

  motoristaForm!: FormGroup;

  id_motorista = "";
  motorista: Motorista = {
    id: null!,
    nome: "",
    carteira: "",
    email: ""
  }

  constructor(
    private router: Router,
    private servico: MotoristaService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.id_motorista = this.route.snapshot.paramMap.get("id")!;
    this.findById();
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
  findById(): void {
    this.servico.findById(this.id_motorista).subscribe(resposta => {
      this.motorista = resposta;
    })

  }
  update(): void {
    if(this.motoristaForm.invalid){
      console.log("Nada feito")
      return;
    }
    this.servico.update(this.motorista).subscribe(resposta => {
      this.router.navigateByUrl("/motoristas")
      this.servico.message("Motorista Atualizado")
    })
  }

  cancelar(): void {
    this.router.navigate(['motoristas']);
  }

  categoriasCarteira: string[] = [
    'A','B','C','D','E','AB','AC','AD','AE',
  ];
  submit(){

  }
}