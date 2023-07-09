import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-itinerario-create',
  templateUrl: './itinerario-create.component.html',
  styleUrls: ['./itinerario-create.component.css']
})
export class ItinerarioCreateComponent implements OnInit {



  viagemForm!: FormGroup;

  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  sedes: Sede[] = [];
  setores: Setor[] = [];
  dtSaida!: Date;
  dtVolta!: Date;


  dataHoraAtual!: Date;

  materiais: Material[] = [];

  destinosViagem: Number[] = [];
  materialid: Number = 0;
  qtd: Number = 0;
  setor: Number = 0;

  materiaisDestino: Materiais[] = [];

  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0,
    nomeMaterial: null!,
    nomeSetor: null!
  }
  destinosViagemView: Destino[] = [];
  destino: Destino = {
    id: null!,
    sedeId: 0,
    materiaisQntdSetor: this.materiaisDestino,
    status: null!,
    nomeSede: null!


  };
  materialErro: boolean = false;
  addMaterial() {
    this.materialErro = false;
    const novoObjeto: Materiais = {
      materialId: this.interfaceMateriais.materialId,
      quantidade: this.interfaceMateriais.quantidade,
      setorDestino: this.interfaceMateriais.setorDestino,
      nomeMaterial: "",
      nomeSetor: ""


    };
    if (novoObjeto.materialId == 0 || novoObjeto.quantidade == 0 || novoObjeto.setorDestino == 0) {
      this.materialErro = true;
      return
    }
    this.materialErro = false;
    this.materiaisDestino.push(...[novoObjeto]);
    this.interfaceMateriais.materialId = 0;
    this.interfaceMateriais.quantidade = 0;
    this.interfaceMateriais.setorDestino = 0;
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


    /*
        if (novoObjeto.materialId != null && novoObjeto.setorDestino != null) {
    
    
          for (let k = 0; k < this.setores.length; k++) {
            if (this.setores[k].id === novoObjeto.setorDestino) {
    
              novoObjeto.nomeSetor = this.setores[k].nome;
    
            }
          }
    
    
          for (let k = 0; k < this.materiais.length; k++) {
            if (this.materiais[k].id === novoObjeto.materialId) {
              novoObjeto.nomeMaterial = this.materiais[k].nome;
    
            }
          }
    
        } else {
          console.log("deu não")
        }
    
    
    */

  }

  destinoErro: boolean = false;
  addDestino() {
    if (this.destino.sedeId == 0) {
      this.destinoErro = true;
      return
    }
    this.destinoErro = false;
    this.destinoService.create(this.destino).subscribe(res => {
      this.destinosViagem.push(res.id);
      this.destinosViagemView.push(res);


      for (let i = 0; i < this.destinosViagem.length; i++) {

        console.log("ID :" + this.destinosViagem[i])
      }
      console.log(res);
      this.materiaisDestino.splice(0, this.materiaisDestino.length);

      for (let i = 0; i < this.destinosViagemView.length; i++) {
        for (let j = 0; j < this.sedes.length; j++) {
          if (this.destinosViagemView[i].sedeId == this.sedes[j].id) {
            this.destinosViagemView[i].nomeSede = this.sedes[j].nome;
          } else {

          }
        }
      }
    })
  }

  constructor(
    private router: Router,
    private servico: ItinerarioService,
    private servicoVeiculo: VeiculoService,
    private servicoMotorista: MotoristaService,
    private servicoSede: SedeService,
    private serviceMaterial: MaterialService,
    private dialog: MatDialog,
    private serviceSetor: SetorService,
    private destinoService: DestinoService
  ) {
    this.dataHoraAtual = new Date();
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




  create(): void {
    alert(this.dtSaida.getDate());
    if (this.dtSaida.getDate() > this.dataHoraAtual.getDate()) {

    }

    if (this.dtSaida == null || this.viagem.motoristaId == 0 || this.viagem.veiculoId == 0 || this.viagem.sede == 0 || this.dtSaida > this.dataHoraAtual) {

      return
    }
    console.log(this.viagem)
    this.viagem.datetimeSaida = this.dtSaida.toLocaleString('pt-br');
    if (this.viagem.datetimeVolta == "") {
    } else {
      this.viagem.datetimeVolta = this.dtVolta.toLocaleString('pt-br');
    }

    this.servico.create(this.viagem).subscribe((resposta) => {
      console.log(resposta);
      this.router.navigate(['itinerarios']);
    })
  }

  ngOnInit(): void {
    this.buscarTodosVeiculo();
    this.buscarTodasSedes();
    this.buscarTodosMotoristas();
    this.buscarMaterial();
    this.buscarSetor();
    this.viagemForm = new FormGroup({
      id: new FormControl(''),
      motoristaId: new FormControl('', [Validators.required]),
      veiculoId: new FormControl(''),
      destinos: new FormControl(['']),
      datetimeSaida: new FormControl(Date, [Validators.required]),
      datetimeVolta: new FormControl(Date),
      sede: new FormControl('', [Validators.required]),
      materialID: new FormControl(''),
      quantidade: new FormControl('', [Validators.min(1)]),
      setorDestino: new FormControl(''),
      destinatario: new FormControl(''),


    })
  }
  get sede() {
    return this.viagemForm.get('sede')!;
  }
  get motoristaId() {
    return this.viagemForm.get('motoristaId')!;
  }
  get veiculoId() {
    return this.viagemForm.get('veiculoId')!;
  }
  get destinos() {
    return this.viagemForm.get('destinos')!;
  }
  get datetimeSaida() {
    return this.viagemForm.get('datetimeSaida')!;
  }
  get datetimeVolta() {
    return this.viagemForm.get('datetimeVolta')!;
  }
  get materialID() {
    return this.viagemForm.get('materialID')!;
  }

  get quantidade() {
    return this.viagemForm.get('quantidade')!;
  }

  get setorDestino() {
    return this.viagemForm.get('setorDestino')!;
  }

  get destinatario() {
    return this.viagemForm.get('destinatario')!;
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
  msg(): void {
    this.servico.mensagem("Material Adicionado ao destino");
  }
  sibmit() {

  }

  excluirDestino(id: any) {
    console.log(this.destinosViagem)
    const index = this.destinosViagem.indexOf(id);
    if (index !== -1) {
      this.destinosViagem.splice(index, 1);
      console.log(this.destinosViagem)
      this.destinosViagemView.splice(index, 1);
    }
    /*
    
        this.destinoService.delet(id).subscribe(res => {
    
        })
        */
  }

}
