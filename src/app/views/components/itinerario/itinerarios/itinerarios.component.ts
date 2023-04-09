import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css']
})
export class ItinerariosComponent implements OnInit {

  itinerarios: Itinerario[] = [];
  nomeMotorista: String[] = [];

  constructor(
    private router: Router,
    private service: ItinerarioService,
    private serviceMotorista: MotoristaService,
    private serviceVeiculo: VeiculoService

  ) {


  }


  ngOnInit(): void {
    this.findAll()

  }
  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.itinerarios = resposta;
      for (let i = 0; i < this.itinerarios.length; i++) {
        this.serviceMotorista.findById(this.itinerarios[i].motoristaId).subscribe(resposta => {
          this.itinerarios[i].motorista = resposta.nome;
        
        })
        this.serviceVeiculo.findbyId(this.itinerarios[i].veiculoId).subscribe(resposta => {
          this.itinerarios[i].veiculo = resposta.marca;
        })
        console.log(this.itinerarios[i].motoristaId);


      }


    })
  }

  getId(s: Itinerario) {
    console.log(s.id)

    this.service.delet(s.id).subscribe(resposta => {
      this.findAll();
    })

  }
}
