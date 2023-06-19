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

  addMaterial() {
    const novoObjeto: Materiais = {
      materialId: this.interfaceMateriais.materialId,
      quantidade: this.interfaceMateriais.quantidade,
      setorDestino: this.interfaceMateriais.setorDestino,
      nomeMaterial: null!,
      nomeSetor: null!
    };


    this.materiaisDestino.push(...[novoObjeto]);

    console.log(this.materiaisDestino);
  }
  addDestino() {

    this.destinoService.create(this.destino).subscribe(res => {
      this.destinosViagem.push(res.id);
      this.destinosViagemView.push(res);


      for (let i = 0; i < this.destinosViagem.length; i++) {

        console.log("ID :" + this.destinosViagem[i])
      }
      console.log(res);
      this.materiaisDestino.splice(0, this.materiaisDestino.length);

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

    if (this.viagemForm.invalid) {
      console.log("Erro")
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
}
