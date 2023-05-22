import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Destino } from 'src/app/models/destino';
import { Itinerario } from 'src/app/models/itinerario';
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

export interface PeriodicElement {
  Material: string;
  QTD: number;
  SetorDestinatario: number;

}
const ELEMENT_DATA: PeriodicElement[] = [
  { QTD: 1, Material: 'Hydrogen', SetorDestinatario: 1.0079 },
  { QTD: 2, Material: 'Helium', SetorDestinatario: 4.0026 },
  { QTD: 3, Material: 'Lithium', SetorDestinatario: 6.941 },
  { QTD: 4, Material: 'Beryllium', SetorDestinatario: 9.0122 },
  { QTD: 5, Material: 'Boron', SetorDestinatario: 10.811 },

];
@Component({
  selector: 'app-itinerario-create',
  templateUrl: './itinerario-create.component.html',
  styleUrls: ['./itinerario-create.component.css']
})
export class ItinerarioCreateComponent implements OnInit {
  displayedColumns: string[] = ['Material', 'QTD', 'SetorDestinatario'];
  dataSource = ELEMENT_DATA;

  viagemForm!: FormGroup;
  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  sedes: Sede[] = [];
  setores: Setor[] = [];
  dtSaida!: Date;
  dtVolta!: Date;

  materiais: Material[] = [];

  destinosViagem: Destino[] = [];

  destino: Destino = {
    id: null!,
    sedeID: null!,
    materiais: {
      materialID: null!,
      quantidade: 0,
      setorDestino: null!
    }
  };

  addDestino() {
    this.destinosViagem.push(this.destino);
    console.log(this.destinosViagem);
  }

  constructor(
    private router: Router,
    private servico: ItinerarioService,
    private servicoVeiculo: VeiculoService,
    private servicoMotorista: MotoristaService,
    private servicoSede: SedeService,
    private serviceMaterial: MaterialService,
    private dialog: MatDialog,
    private serviceSetor: SetorService
  ) {

  }

  criarMaterial(): void {

    const dialogRef: MatDialogRef<CriarMaterialComponent> = this.dialog.open(CriarMaterialComponent, {
      width: '600px', // Defina a largura do diálogo conforme necessário
      data: { /* Opcionalmente, você pode passar dados para o diálogo */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manipule o resultado do diálogo, se necessário
      this.buscarMaterial();
    });
  }
  viagem: Viagem = {
    id: null!,
    datetimeSaida: "",
    datetimeVolta: "",
    destinos: [],
    motoristaId: 0,
    sede: 0,
    veiculoId: 0
  }

  create(): void {

    this.viagem.datetimeSaida = this.dtSaida.toLocaleString('pt-br');
    console.log(this.viagem.datetimeSaida);
    if (this.viagem.datetimeVolta == "") {
    } else {
      this.viagem.datetimeVolta = this.dtVolta.toLocaleString('pt-br');
    }
    console.log(this.viagem.datetimeVolta)
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
      motoristaId: new FormControl(''),
      veiculoId: new FormControl(''),
      destinos: new FormControl([2]),
      datetimeSaida: new FormControl(Date),
      datetimeVolta: new FormControl(Date),
      sede: new FormControl('')

    })
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
  get sede() {
    return this.viagemForm.get('sede')!;
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





}
