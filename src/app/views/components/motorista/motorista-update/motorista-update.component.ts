import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista';
import { MotoristaService } from 'src/app/services/motorista.service';

@Component({
  selector: 'app-motorista-update',
  templateUrl: './motorista-update.component.html',
  styleUrls: ['./motorista-update.component.css']
})
export class MotoristaUpdateComponent implements OnInit {


  id_motorista = "";
  motorista: Motorista = {
    id: null!,
    nome: "",
    categoriaCarteira: "",
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
  }
  findById(): void {
    this.servico.findById(this.id_motorista).subscribe(resposta => {
      this.motorista = resposta;
    })

  }
  update(): void {
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
}
