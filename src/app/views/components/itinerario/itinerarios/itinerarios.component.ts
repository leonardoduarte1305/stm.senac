import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
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
  interval: any;

  constructor(
    private router: Router,
    private service: ItinerarioService,
    private serviceMotorista: MotoristaService,
    private serviceVeiculo: VeiculoService
  ) { }


  ngOnInit(): void {
    this.findAll();
  }

  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }

  findAll(): void {

    this.service.findAll().subscribe((resposta) => {
      this.itinerarios = resposta;

      //loop para pegar veiculos e motoristas pertencentes as viagens 
      for (let i = 0; i < this.itinerarios.length; i++) {
        //busca de motorista por ID
        this.serviceMotorista.findById(this.itinerarios[i].motoristaId).subscribe(resposta => {
          this.itinerarios[i].motorista = resposta.nome;

        })
        //busca de veículo por ID
        this.serviceVeiculo.findbyId(this.itinerarios[i].veiculoId).subscribe(resposta => {
          this.itinerarios[i].veiculo = resposta.marca;
        })
        console.log(this.itinerarios[i].motoristaId);
      }
    })
    //Chamada de função para icon de demonstração de status confirmado ou não confirmado através de cor
    this.interval = setInterval(() => {
      this.confirmacao();
    }, 700);

  }


  confirmacao(): void {
    let x = document.getElementsByTagName("h5")
    for (let i = 0; i < this.itinerarios.length; i++) {

      if (this.itinerarios[i].status.confirmacao === "CONFIRMADO") {
        x[i].style.backgroundColor = "green"

      } else {
        console.log(this.itinerarios[i].status.confirmacao);
      }
    }
    clearInterval(this.interval);
  }


  //exclusão de viagem
  //terminar validação de exclusão
  getId(s: Itinerario) {
    console.log(s.id)
    this.service.delet(s.id).subscribe(resposta => {
      this.findAll();
    })
  }


}
