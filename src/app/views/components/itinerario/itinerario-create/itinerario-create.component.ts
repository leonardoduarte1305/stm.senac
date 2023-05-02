import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario';
import { Motorista } from 'src/app/models/motorista';
import { Sede } from 'src/app/models/sede';
import { Veiculo } from 'src/app/models/veiculo';
import { Viagem } from 'src/app/models/viagem';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { SedeService } from 'src/app/services/sede.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

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
  dtSaida!: Date;
  dtVolta!: Date;
  constructor(
    private router: Router,
    private servico: ItinerarioService,
    private servicoVeiculo: VeiculoService,
    private servicoMotorista: MotoristaService,
    private servicoSede: SedeService
  ) {

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
    if(this.viagem.datetimeVolta==""){
      
    }else{
      this.viagem.datetimeVolta=this.dtVolta.toLocaleString('pt-br');

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

  navigationToItinerarios() {
    this.router.navigate(['itinerarios']);
  }
  msg(): void {
    this.servico.mensagem("Material Adicionado ao destino");
  }
}
