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

  materiaisDestino: Materiais[] = [];

  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0
  }
  destino: Destino = {
    id: null!,
    sedeId: 0,
    materiaisQntdSetor: this.materiaisDestino,
    status: null!


  };

  addMaterial() {
    const novoObjeto: Materiais = {
      materialId: this.interfaceMateriais.materialId,
      quantidade: this.interfaceMateriais.quantidade,
      setorDestino: this.interfaceMateriais.setorDestino
    };

    this.materiaisDestino.push(novoObjeto);

    console.log(this.materiaisDestino);
  }
  addDestino() {

    this.destinoService.create(this.destino).subscribe(res => {
      this.destinosViagem.push(res.id);


      for (let i = 0; i < this.destinosViagem.length; i++) {
        console.log("ID :" + this.destinosViagem[i])
      }
      console.log(res);
      this.materiaisDestino.pop();
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
    veiculoId: 0
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

  dataHoraString: string = "";
  buscarPorId(): void {
    this.servico.findById(this.id_viagem).subscribe(res => {
      this.viagem = res;
      document.getElementById("dtSaida")
      this.buscar();

      /*
      for(let i =0;i<res.destinos.length;i++){
        
      }
      */

      this.dataHoraString = this.transformarStringEmData(res.datetimeSaida)

    })
  }

  buscar() {

    this.destinoService.buscarDestinoPorIdViagem(this.id_viagem).subscribe(res => {

     console.log(res)

      interface Destino {
        sedeId: number;
        materiaisQntdSetor: {
          materialId: number;
          quantidade: number;
          setorDestino: number;
        }[];
        id: number;
        status: {
          confirmacao: string;
        };
      }
      
      function processarDestino(destino: Destino): void {
        const materiais = destino.materiaisQntdSetor;
        if (materiais && materiais.length > 0) {
          for (const material of materiais) {
            const materialId = material.materialId;
            const quantidade = material.quantidade;
            const setorDestino = material.setorDestino;
            console.log('Material ID:', materialId);
            console.log('Quantidade:', quantidade);
            console.log('Setor Destino:', setorDestino);
          }
        }
      }
    })
  }
  transformarStringEmData(dataHoraString: string): string {
    const dataHora = new Date(dataHoraString);
    return dataHora.toISOString().substring(0, 16);
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

}
