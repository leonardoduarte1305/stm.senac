import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';


@Component({
  selector: 'app-sede-create',
  templateUrl: './sede-create.component.html',
  styleUrls: ['./sede-create.component.css']
})
export class SedeCreateComponent implements OnInit {

  sedeForm!: FormGroup;
  cepValidacao = false;
  sede: Sede = {
    id: null!,
    rua: "",
    numero: null!,
    cep: null!,
    cidade: "",
    uf: "",
    nome: "",
    observacao: ""
  }
  ngOnInit(): void {
    this.sedeForm = new FormGroup({
      id: new FormControl(''),
      rua: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      nome: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      numero: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/\S/)]),
      cidade: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      uf: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      observacao: new FormControl(''),
      cep: new FormControl(''),

    })
  }
  get nome() {
    return this.sedeForm.get('nome')!;
  }

  get numero() {
    return this.sedeForm.get('numero')!;
  }
  get cep() {

    return this.sedeForm.get('cep')!;
  }
  get rua() {

    return this.sedeForm.get('rua')!;
  }
  get cidade() {

    return this.sedeForm.get('cidade')!;
  }
  get uf() {

    return this.sedeForm.get('uf')!;
  }
  get observacao() {

    return this.sedeForm.get('observacao')!;
  }
  constructor(
    private router: Router,
    private service: SedeService,
    private snack: MatSnackBar
  ) {

  }

  navigationToSedes() {
    this.router.navigate(['sedes']);
  }

  create(): void {
  
    console.log(this.sede)

    this.cepValidacao = false;
    this.service.create(this.sede).subscribe((resposta) => {
      this.router.navigate(['sedes'])
      this.message("Sede salva!")
    })
  }

  cepInvalid: boolean = false;

  message(msg: String): void {

    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ["barr"]

    })
  }


  submit() {
    if (this.sedeForm.invalid) {
      return
    }
    this.create()
  }


  formatCEP(event: Event): String {

    const inputElement = event.target as HTMLInputElement;
    let cep = inputElement.value;
    cep = cep.replace(/\D/g, '');
    if (cep.length === 8) {
      cep = cep.substring(0, 5) + '-' + cep.substring(5);
      this.cepValidacao = false;
    } else {
      this.cepValidacao = true;
    }

    return cep;
  }
}

