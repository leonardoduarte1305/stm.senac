import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm!: FormGroup;

  constructor(
    private router: Router,
    private service: UsuarioService
  ) {

  }

  usuario: Usuario = {
    id: null!,
    email: "",
    nome: "",
    password: "",
    role: "",
    sobrenome: "",
    username: ""

  }

  ngOnInit(): void {

    this.usuarioForm = new FormGroup({
      id: new FormControl(null!),
      username: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      nome: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      sobrenome: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    })
  }

  get username() {
    return this.usuarioForm.get('username')!;
  }
  get password() {
    return this.usuarioForm.get('password')!;
  }
  get nome() {
    return this.usuarioForm.get('nome')!;
  }
  get sobrenome() {
    return this.usuarioForm.get('sobrenome')!;
  }
  get email() {
    return this.usuarioForm.get('email')!;
  }
  get role() {
    return this.usuarioForm.get('role')!;
  }

  submit() {
    if (this.usuarioForm.invalid) {
      return;
    }
    this.service.create(this.usuario).subscribe(res => {
      this.router.navigate(["/home"])
    })

  }
  cancelar(){
    this.router.navigate(["/home"])
  }

}
