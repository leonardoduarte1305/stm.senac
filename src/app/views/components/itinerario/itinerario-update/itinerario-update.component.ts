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

  atualizarViagem() {
    console.log(this.viagem.datetimeSaida)
    this.viagem.datetimeSaida = this.dtSaida.toLocaleString('pt-br');
    if (this.dtVolta == null) {
    } else {
      this.viagem.datetimeVolta = this.dtVolta.toLocaleString('pt-br');
    }

    this.servico.update(this.viagem).subscribe(res => {
      console.log(res);
    })
    console.log(this.viagem)
  }



  addMaterial() {
    const novoObjeto: Materiais = {
      materialId: this.interfaceMateriais.materialId,
      quantidade: this.interfaceMateriais.quantidade,
      setorDestino: this.interfaceMateriais.setorDestino,
      nomeMaterial: null!,
      nomeSetor: null!
    };

    this.materiaisDestino.push(novoObjeto);

    console.log(this.materiaisDestino);
  }


  addDestino() {
    this.destinoService.create(this.destino).subscribe(res => {
      this.destinosViagem.push(res.id);
      this.viagem.destinos.push(res.id);
      for (let i = 0; i < this.destinosViagem.length; i++) {
        console.log("ID :" + this.destinosViagem[i])
      }
      console.log(res);
      console.log(this.viagem);
      this.materiaisDestino.pop();
    })
  }




  dataHoraString: string = "";
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

      this.dataHoraString = this.transformarStringEmData(res.datetimeSaida)

      if (res.status.confirmacao === "CONFIRMADO") {
        let s = document.getElementById("statusComCor");
        s!.style.backgroundColor = "green";
        this.msgConfirmacao = "VIAGEM CONFIRMADA"
      } else {
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
      })

      if (this.destinosDaViagem[i].status.confirmacao === "CONFIRMADO") {
        this.msgIconConfirmDestino = "desconfirmar"
      } else {
        this.msgIconConfirmDestino = "confirmar";
      }

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

  transformarStringEmData(dataHoraString: string): string {

    const dataHora = new Date(dataHoraString);
    return dataHora.toISOString().substring(0, 16);

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

        this.ngOnInit();
      })
    }
    console.log(this.viagem.destinos);

    /*
     this.destinoService.delet(id).subscribe(res => {
       console.log(id, this.id_viagem)
     }), console.error("Deu erro na requisição de delet de destino");
 
 */
  }

  confirmarDestino(id: any): void {
    this.destinoService.confirmarDestino(id, this.confirmacao).subscribe(res => {
    }), console.error("Não deu")
  }

  confirmarViagem(): void {
    this.servico.status(this.id_viagem, this.confirmacao).subscribe(res => {
      console.log(res)

    })

  }

  encerrarViagem() {

    this.servico.encerrarViagem(this.id_viagem, this.encerrar).subscribe(res => {
      console.log(res);
      this.router.navigate(['itinerarios'])
    })
  }

}

