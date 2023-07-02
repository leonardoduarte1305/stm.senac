import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex, of } from 'rxjs';
import { RespostaHttp } from 'src/app/models/Interface.Destino';

import { Confirmacao } from 'src/app/models/confirmacao';
import { Destino } from 'src/app/models/destino';
import { Itinerario } from 'src/app/models/itinerario';
import { Materiais } from 'src/app/models/materiais';
import { Material } from 'src/app/models/material';
import { Setor } from 'src/app/models/setor';
import { DestinoService } from 'src/app/services/destino.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MaterialService } from 'src/app/services/material.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { SedeService } from 'src/app/services/sede.service';
import { SetorService } from 'src/app/services/setor.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { ViagemService } from 'src/app/services/viagem.service';
import { LoadingComponent } from '../../template/loading/loading.component';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css']
})



export class ItinerariosComponent implements OnInit {

  loadingComponent: LoadingComponent = new LoadingComponent();
  itinerarios: Itinerario[] = [];
  interval: any;
  destinos: Destino[] = [];
  setores: Setor[] = [];
  materiais: Material[] = [];
  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0,
    nomeMaterial: null!,
    nomeSetor: null!
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
    private serviceMaterial: MaterialService,
    private serviceSetor: SetorService,
    private serviceLogin: LoginService

  ) { }



  ngOnInit(): void {
    this.findAll();
    this.chamarSetoresNome();

    this.chamarMateriais();

  }

  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }


  chamarSetoresNome(): void {
    this.serviceSetor.findAll().subscribe(res => {
      this.setores = res;
      console.log(this.setores)
    })

  }
  chamarMateriais(): void {
    this.serviceMaterial.buscarMateriais().subscribe(res => {
      this.materiais = res;
      console.log(this.materiais)
    })
  }

  fazerRequisicao() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.serviceLogin.getToken());
    
    for (let i = 0; i < this.itinerarios.length; i++) {
      this.http.get<RespostaHttp[]>("http://localhost:8080/viagens/" + this.itinerarios[i].id + "/destinos",{headers}).subscribe(

        resposta => {

          this.itinerarios[i].interfaceDestino = resposta;
          for (let j = 0; j < this.itinerarios[i].interfaceDestino.length; j++) {

            this.serviceSede.findById(this.itinerarios[i].interfaceDestino[j].sedeId).subscribe(res => {
              this.itinerarios[i].interfaceDestino[j].sedeDestino = res.nome;
            })
            for (let s = 0; s < this.itinerarios[i].interfaceDestino[j].materiaisQntdSetor.length; s++) {
              const materialIdDesejado = this.itinerarios[i].interfaceDestino[j].materiaisQntdSetor[s].materialId;
              const setorIdDesejado = this.itinerarios[i].interfaceDestino[j].materiaisQntdSetor[s].setorDestino;



              for (let k = 0; k < this.setores.length; k++) {
                if (this.setores[k].id === setorIdDesejado) {
                  this.itinerarios[i].interfaceDestino[j].materiaisQntdSetor[s].nomeSetor = this.setores[k].nome;
                  break;
                }
              }


              for (let k = 0; k < this.materiais.length; k++) {
                if (this.materiais[k].id === materialIdDesejado) {
                  this.itinerarios[i].interfaceDestino[j].materiaisQntdSetor[s].nomeMaterial = this.materiais[k].nome;
                  break;
                }
              }




            }

          }

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

  }



  async findAll() {



    this.service.findAll().subscribe((resposta) => {
      
      this.itinerarios = resposta;


      //loop para pegar veiculos e motoristas pertencentes as viagens 
      for (let i = 0; i < this.itinerarios.length; i++) {

        //    this.fazerRequisicao(this.itinerarios[i].id);
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
      this.fazerRequisicao();
    })


    //Chamada de função para icon de demonstração de status confirmado ou não confirmado através de cor
    this.interval = setInterval(() => {
      this.confirmacaoStatus();
    }, 200);

  }


  /*===========================================================================================
  ========================BUSCA DE SEDE,VEICULO E MOTORISTA PARA INCLUSÃO NA VIAGEM ===========
  =============================================================================================*/


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

 

  /*===============================================================================================================================
  ========================FAZER EFEITO VISUAL DE CIRCULO VERDE OU VERMELHO DE ACORDO COM O STATUS SA VIAGEM =======================
  =================================================================================================================================*/



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



  /*===================================================================
========================EXCLUSÃO DE VIAGEM =======================
=====================================================================*/

  //terminar validação de exclusão



  getId(s: Itinerario) {
    console.log(s.id)
    this.service.delet(s.id).subscribe(resposta => {
      this.findAll();
    })
  }




  /*===================================================================
========================BUSCAR E GERAR PDF =======================
=====================================================================*/

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



  /*
  
    public confirmarDestino(id: any) {
      const url = `http://localhost:8080/destinos/${id}/confirmacao`;
      const body = { confirmacao: 'CONFIRMADO' };
    
      this.http.post(url, body).subscribe((response) => {
        console.log(response);
      });
    }
    */

  /*===================================================================
  ========================CONFIRMAÇÃO DE VIAGEM =======================
  =====================================================================*/


}
