import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { RespostaHttp } from 'src/app/models/Interface.Destino';

import { Confirmacao } from 'src/app/models/confirmacao';
import { Destino } from 'src/app/models/destino';
import { Itinerario } from 'src/app/models/itinerario';
import { Materiais } from 'src/app/models/materiais';
import { DestinoService } from 'src/app/services/destino.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { SedeService } from 'src/app/services/sede.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { ViagemService } from 'src/app/services/viagem.service';


@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css']
})



export class ItinerariosComponent implements OnInit {

  itinerarios: Itinerario[] = [];
  interval: any;
  destinos: Destino[] = [];

  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0
  }
  mostrarDestinos: boolean = false;
  constructor(
    private router: Router,
    private service: ItinerarioService,
    private serviceMotorista: MotoristaService,
    private serviceVeiculo: VeiculoService,
    private serviceSede: SedeService,
    private viagemService: ViagemService,
    private http: HttpClient,
    private serviceDestino: DestinoService,

  ) { }



  ngOnInit(): void {
    this.findAll();
  }

  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }


  fazerRequisicao(id: any) {
    this.http.get<RespostaHttp[]>("http://localhost:8080/viagens/" + id + "/destinos").subscribe(
      resposta => {
        // Aqui você pode acessar os dados da resposta tipados corretamente
        for (const dado of resposta) {
          console.log('Sede ID:', dado.sedeId);

          for (const mqSetor of dado.materiaisQntdSetor) {
            console.log('Material ID:', mqSetor.materialId);
            console.log('Quantidade:', mqSetor.quantidade);
            console.log('Setor Destino:', mqSetor.setorDestino);
          }

          console.log('ID:', dado.id);
          console.log('Status:', dado.status.confirmacao);

          console.log('------------------------');
        }
      },
      erro => {
        console.error('Erro na requisição:', erro);
      }
    );
  }
  async findAll() {

    this.service.findAll().subscribe((resposta) => {
      this.itinerarios = resposta;

      //loop para pegar veiculos e motoristas pertencentes as viagens 
      for (let i = 0; i < this.itinerarios.length; i++) {
        this.fazerRequisicao(this.itinerarios[i].id);
        /*   this.serviceDestino.buscarDestinoPorIdViagem(this.itinerarios[i].id).subscribe(res => {
   
             this.destinos=[res];
             console.log(this.destinos[i])
         //    this.imprimirDados(this.destinos);
           });
           */
        this.buscarSedePorId(i);
        //busca de motorista por ID
        this.buscarMotoristPorId(i);
        //busca de veículo por ID
        this.buscarVeiculoPorId(i);
      }
    })


    //Chamada de função para icon de demonstração de status confirmado ou não confirmado através de cor
    this.interval = setInterval(() => {
      this.confirmacaoStatus();
    }, 2000);

  }


  imprimirDados(dados: Destino[]) {
    for (const dado of dados) {
      console.log('Sede ID:', dado.sedeId);

      for (const mqSetor of dado.materiaisQntdSetor) {
        console.log('Material ID:', mqSetor.materialId);
        console.log('Quantidade:', mqSetor.quantidade);
        console.log('Setor Destino:', mqSetor.setorDestino);
      }

      console.log('ID:', dado.id);
      console.log('Status:', dado.status.confirmacao);

      console.log('------------------------');
    }
  }
  buscarSedePorId(i: any) {
    this.serviceSede.findById(this.itinerarios[i].sede).subscribe(resposta => {
      this.itinerarios[i].nomeSede = resposta.nome;
    })
  }
  buscarMotoristPorId(i: any) {
    this.serviceMotorista.findById(this.itinerarios[i].motoristaId).subscribe(resposta => {
      this.itinerarios[i].motorista = resposta.nome;

    })
  }

  buscarVeiculoPorId(i: any) {
    this.serviceVeiculo.findbyId(this.itinerarios[i].veiculoId).subscribe(resposta => {
      this.itinerarios[i].veiculo = resposta.modelo;
    })
  }

  //NÃO ESTA PRONTO
  mostrar() {
    this.mostrarDestinos = true
  }

  confirmacaoStatus(): void {
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



  pdf(id: Number) {
    console.log(id)
    this.viagemService.baixarPDF(id).subscribe(res => {
      let url = window.URL.createObjectURL(res);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'Download pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  confirmacao: Confirmacao = {
    confitmacao: "CONFIRMADO"
  }

  /*
  
    public confirmarDestino(id: any) {
      const url = `http://localhost:8080/destinos/${id}/confirmacao`;
      const body = { confirmacao: 'CONFIRMADO' };
    
      this.http.post(url, body).subscribe((response) => {
        console.log(response);
      });
    }
    */

  confirmar(id: any): void {

    this.service.status(id, this.confirmacao).subscribe(res => {
      console.log(res)
    })
  }


}
