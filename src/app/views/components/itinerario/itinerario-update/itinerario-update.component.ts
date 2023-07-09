import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Destino } from 'src/app/models/destino';
import { Material } from 'src/app/models/material';
import { Motorista } from 'src/app/models/motorista';
import { Sede } from 'src/app/models/sede';
import { Veiculo } from 'src/app/models/veiculo';
import { Viagem } from 'src/app/models/viagem';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MaterialService } from 'src/app/services/material.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { SedeService } from 'src/app/services/sede.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { CriarMaterialComponent } from '../../material/criar-material/criar-material.component';
import { SetorService } from 'src/app/services/setor.service';
import { Setor } from 'src/app/models/setor';
import { DestinoService } from 'src/app/services/destino.service';
import { Materiais } from 'src/app/models/materiais';
import { Confirmacao } from 'src/app/models/confirmacao';
import { Itinerario } from 'src/app/models/itinerario';
import { forkJoin, switchMap } from 'rxjs';
import { DestinoUpdateComponent } from '../destino-update/destino-update.component';
import { EncerrarViagem } from 'src/app/models/encerrarViagem';

@Component({
  selector: 'app-itinerario-update',
  templateUrl: './itinerario-update.component.html',
  styleUrls: ['./itinerario-update.component.css']
})
export class ItinerarioUpdateComponent implements OnInit {

  id_viagem = ""
  viagemForm!: FormGroup;
  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  sedes: Sede[] = [];
  setores: Setor[] = [];
  dtSaida!: Date;
  dtVolta!: Date;

  materiais: Material[] = [];

  destinosViagem: Number[] = [];
  materialid: Number = 0;
  qtd: Number = 0;
  setor: Number = 0;
  destinosDaViagem: Destino[] = [];

  materiaisDestino: Materiais[] = [];

  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0,
    nomeMaterial: null!,
    nomeSetor: null!
  }
  destino: Destino = {
    id: null!,
    sedeId: 0,
    materiaisQntdSetor: this.materiaisDestino,
    status: null!,
    nomeSede: null!

  };


  constructor(
    private router: Router,
    private servico: ItinerarioService,
    private servicoVeiculo: VeiculoService,
    private servicoMotorista: MotoristaService,
    private servicoSede: SedeService,
    private serviceMaterial: MaterialService,
    private dialog: MatDialog,
    private serviceSetor: SetorService,
    private destinoService: DestinoService,
    private route: ActivatedRoute
  ) {

  }

  criarMaterial(): void {
    const dialogRef: MatDialogRef<CriarMaterialComponent> = this.dialog.open(CriarMaterialComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarMaterial();
    });



  }
  viagem: Viagem = {
    id: null!,
    datetimeSaida: "",
    datetimeVolta: "",
    destinos: this.destinosViagem,
    motoristaId: 0,
    sede: 0,
    veiculoId: 0,
    status: {
      confirmacao: ""
    },
  }
  itinerario: Itinerario = {
    id: null!,
    motoristaId: null!,
    veiculoId: null!,
    datetimeSaida: "",
    datetimeVolta: "",
    encerrado: "",
    status: {
      confirmacao: ""
    },
    motorista: "",
    veiculo: "",
    nomeSede: "",
    sede: null!,
    interfaceDestino: null!

  }

  confirmacao: Confirmacao = {
    confirmacao: "CONFIRMADO"
  }
  encerrar: EncerrarViagem = {
    encerrado: "ENCERRAR"
  }

  ngOnInit(): void {
    this.id_viagem = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();

    this.buscarTodosVeiculo();
    this.buscarTodasSedes();
    this.buscarTodosMotoristas();
    this.buscarMaterial();
    this.buscarSetor();
    this.validarUser();
    this.viagemForm = new FormGroup({
      id: new FormControl(''),
      motoristaId: new FormControl(''),
      veiculoId: new FormControl(''),
      destinos: new FormControl(['']),
      datetimeSaida: new FormControl(Date),
      datetimeVolta: new FormControl(Date),
      sede: new FormControl(''),
      materialID: new FormControl(''),
      quantidade: new FormControl(''),
      setorDestino: new FormControl(''),
      destinatario: new FormControl(''),


    })
  }
  mostrarDados: boolean = false;
  validarUser() {
    setTimeout(() => {
      if (localStorage.getItem("role") == "USER") {
        this.mostrarDados = false;
      } else {
        this.mostrarDados = true;
      }
    }, 50)
  }

  atualizarViagem() {
    console.log(this.viagem.datetimeSaida)
    console.log(this.viagem.datetimeVolta)
    /*this.viagem.datetimeSaida = this.dtSaida.toLocaleString('pt-br');
    if (this.dtVolta == null) {
    } else {
      this.viagem.datetimeVolta = this.dtVolta.toLocaleString('pt-br');
    }
*/
    this.servico.update(this.viagem).subscribe(res => {
      this.router.navigate(['itinerarios']);
      console.log(res);
    })
    console.log(this.viagem)
  }


  materialErro: boolean = false;
  addMaterial() {
    const novoObjeto: Materiais = {
      materialId: this.interfaceMateriais.materialId,
      quantidade: this.interfaceMateriais.quantidade,
      setorDestino: this.interfaceMateriais.setorDestino,
      nomeMaterial: null!,
      nomeSetor: null!
    };
    if (novoObjeto.materialId == 0 || novoObjeto.quantidade == 0 || novoObjeto.setorDestino == 0) {
      this.materialErro = true;
      return
    }
    this.materialErro = false;

    this.materiaisDestino.push(novoObjeto);

    for (let i = 0; i < this.materiaisDestino.length; i++) {
      for (let j = 0; j < this.setores.length; j++) {
        if (this.materiaisDestino[i].setorDestino == this.setores[j].id) {
          this.materiaisDestino[i].nomeSetor = this.setores[j].nome;
        }
      }
      for (let j = 0; j < this.materiais.length; j++) {
        if (this.materiaisDestino[i].materialId == this.materiais[j].id) {
          this.materiaisDestino[i].nomeMaterial = this.materiais[j].nome;
        }
      }

    }

    console.log(this.materiaisDestino);
  }

  destinoErro: boolean = false;
  addDestino() {
    if (this.destino.sedeId == 0) {
      this.destinoErro = true;
      return
    }

    this.destinoService.create(this.destino).subscribe(res => {
      this.destinosViagem.push(res.id);
      this.viagem.destinos.push(res.id);
      for (let i = 0; i < this.destinosViagem.length; i++) {

        console.log("ID :" + this.destinosViagem[i])
      }
      this.atualizarViagem();
      setTimeout(() => {

        this.buscarDestinos();
      }, 200);
      console.log(res);
      console.log(this.viagem);
      this.materiaisDestino.splice(0, this.materiaisDestino.length);

    })
  }




  dataHoraString: string = "";
  dataHoraStringVolta: string = ""
  msgIconConfirmDestino: string = "";
  msgConfirmacao: string = "";


  /*****************************************************/
  /*BUSCAR VIAGEM POR ID PARA PREENCHIMENTO DOS CAMPOS*/
  /***************************************************/


  buscarPorId(): void {



    this.servico.findById(this.id_viagem).subscribe(res => {
      this.viagem = res;
      document.getElementById("dtSaida")


      /*
      for(let i =0;i<res.destinos.length;i++){
        
      }
      */

      this.dataHoraString = this.transformarStringEmData(res.datetimeSaida);
      this.dataHoraStringVolta = this.transformarStringEmData(res.datetimeVolta);

      let s = document.getElementById("statusComCor");
      if (res.status.confirmacao === "CONFIRMADO") {
        s!.style.backgroundColor = "green";
        this.msgConfirmacao = "VIAGEM CONFIRMADA"
      } else {
        s!.style.backgroundColor = "red";
        this.msgConfirmacao = "VIAGEM NÃO CONFIRMADA"
      }

    })
    this.buscarDestinos();

  }


  idSetorDestrino: Number = 0;

  /*****************************************************/
  /*BUSCAR DESTINOS DA VIAGEM                         */
  /***************************************************/


  buscarDestinos() {
    this.destinosDaViagem = [];

    this.destinoService.buscarDestinoPorIdViagem(this.id_viagem).subscribe(res => {
      console.log(res)


      const respostaArray = Object.values(res) as Array<any>;

      for (const item of respostaArray) {
        this.destinosDaViagem.push(...[item])

      }
      this.validarStatusConfirmacao();

    })


  }
  validarStatusConfirmacao() {
    for (let i = 0; this.destinosDaViagem.length > i; i++) {

      this.servicoSede.findById(this.destinosDaViagem[i].sedeId).subscribe(resposta => {
        this.destinosDaViagem[i].nomeSede = resposta.nome;

        setTimeout(() => {
          for (let j = 0; j < this.destinosDaViagem[i].materiaisQntdSetor.length; j++) {
            for (const item of this.materiais) {
              if (this.destinosDaViagem[i].materiaisQntdSetor[j].materialId == item.id)
                this.destinosDaViagem[i].materiaisQntdSetor[j].nomeMaterial = item.nome;
            }
            for (const item of this.setores) {
              if (this.destinosDaViagem[i].materiaisQntdSetor[j].setorDestino == item.id)
                this.destinosDaViagem[i].materiaisQntdSetor[j].nomeSetor = item.nome;
            }
          }
        }, 100);

      })


    }
  }



  removerMaterial(idDestino: any, index: any) {

    this.destinoService.buscarDestinoPorId(idDestino).subscribe(res => {

    })

    //this.destinosDaViagem[idDestino].materiaisQntdSetor.splice(index, 1)
    console.log("Destino Id: " + this.destinosDaViagem + " Id material: " + JSON.stringify(index))
    console.log(this.destinosDaViagem[idDestino].materiaisQntdSetor[0].quantidade)
  }

  atualizarDestino(id: any) {
    const dialogRef: MatDialogRef<DestinoUpdateComponent> = this.dialog.open(DestinoUpdateComponent, {
      width: '1800px',
      height: '900px',
      data: id

    });




  }
  /*
    buscarSetorPorId(id: any): string {
      let resultado = ""
  
      for (let i = 0; this.setores.length > i; i++) {
        console.log("Nome")
        if (this.setores[i].id == id) {
          resultado = this.setores[i].nome
        } else {
        }
  
      }
      return resultado
    }
  */
  transformarStringEmData(dataHoraString: string): string {

    const dataHora = new Date(dataHoraString);
    return dataHora.toISOString().substring(0, 16);

  }

  atualizarDataHora(valor: string) {
    this.dataHoraString = valor;
    const dataHora = new Date(valor);
    console.log('Data e Hora:', dataHora);
  }


  buscarTodosVeiculo() {
    this.servicoVeiculo.findAll().subscribe((resposta) => {
      this.veiculos = resposta;

    })
  }
  buscarTodosMotoristas() {
    this.servicoMotorista.findAll().subscribe((resposta) => {
      this.motoristas = resposta;
    })
  }
  buscarTodasSedes() {
    this.servicoSede.findAll().subscribe((resposta) => {
      this.sedes = resposta
    })
  }
  buscarMaterial() {
    this.serviceMaterial.buscarMateriais().subscribe(res => {
      this.materiais = res;
      console.log(this.materiais)
    })

  }
  buscarSetor() {
    this.serviceSetor.findAll().subscribe(res => {
      this.setores = res;
      console.log(this.setores)
    })
  }


  navigationToItinerarios() {
    this.router.navigate(['itinerarios']);
  }

  excluirDestino(id: any) {
    const index = this.viagem.destinos.indexOf(id);
    if (index !== -1) {
      this.viagem.destinos.splice(index, 1);
      this.servico.update(this.viagem).subscribe(res => {

      })
      setTimeout(() => {

        this.buscarPorId();
      }, 100);
    }
    console.log(this.viagem.destinos);

    /*
     this.destinoService.delet(id).subscribe(res => {
       console.log(id, this.id_viagem)
     }), console.error("Deu erro na requisição de delet de destino");
 
 */
  }

  confirmarDestino(id: any): void {
    this.confirmacao.confirmacao = "CONFIRMADO";
    this.destinoService.confirmarDestino(id, this.confirmacao).subscribe(res => {
      this.buscarPorId();
    })
  }
  desconfirmarDestino(id: any): void {
    this.confirmacao.confirmacao = "NAO_CONFIRMADO";
    this.destinoService.desconfirmarDestino(id, this.confirmacao).subscribe(res => {
      this.buscarPorId();
    })
  }

  confirmarViagem(): void {
    this.confirmacao.confirmacao = "CONFIRMADO";
    this.servico.status(this.id_viagem, this.confirmacao).subscribe(res => {
      console.log(res)
      this.buscarPorId();

    })

  }

  desconfirmarViagem():void {
    this.confirmacao.confirmacao='NAO_CONFIRMADO';
    this.servico.desconfirmarViagem(this.id_viagem, this.confirmacao).subscribe(res => {
      this.buscarPorId();
    })
  }

  encerrarViagem() {

    this.servico.encerrarViagem(this.id_viagem, this.encerrar).subscribe(res => {
      console.log(res);
      this.router.navigate(['itinerarios'])
    })
  }
  validarDestino() {
    let b = document.getElementById("corDestino");

  }

  removerMaterialLista(index: any) {

    this.materiaisDestino.splice(index, 1)
    console.log(this.materiaisDestino)
    /*
        this.destinoService.update(this.destino).subscribe(res => {
          console.log(res);
        })
      */
  }
}

