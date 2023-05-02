import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/models/sede';
import { SedeService } from 'src/app/services/sede.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sede-update',
  templateUrl: './sede-update.component.html',
  styleUrls: ['./sede-update.component.css']
})
export class SedeUpdateComponent implements OnInit {
  sedeForm!: FormGroup;
  id_sede = "";
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

  constructor(
    private router: Router,
    private service: SedeService,
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_sede = this.route.snapshot.paramMap.get("id")!;
    this.findById();
    this.sedeForm = new FormGroup({
      id: new FormControl(''),
      rua: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      nome: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      numero: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/\S/)]),
      cidade: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      uf: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      observacao: new FormControl(''),
      cep: new FormControl('',[Validators.required]),

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
  findById(): void {
    this.service.findById(this.id_sede).subscribe(resposta => {
      this.sede = resposta;
    })
  }
  update(): void {
    if (this.sedeForm.invalid) {
      return
    }
    this.service.update(this.sede).subscribe(resposta => {
      this.router.navigate(['sedes']);
      this.message("Sede atualizada")
    }
    )
  }


  navigationToSedes() {
    this.router.navigate(['sedes']);
  }

  message(msg: String): void {

    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ["barr"]

    })
  }
  submit() {

  }
}
