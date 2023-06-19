import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Destino } from 'src/app/models/destino';
import { Materiais } from 'src/app/models/materiais';
import { Material } from 'src/app/models/material';
import { Sede } from 'src/app/models/sede';
import { Setor } from 'src/app/models/setor';
import { DestinoService } from 'src/app/services/destino.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { MaterialService } from 'src/app/services/material.service';
import { MotoristaService } from 'src/app/services/motorista.service';
import { SedeService } from 'src/app/services/sede.service';
import { SetorService } from 'src/app/services/setor.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { CriarMaterialComponent } from '../../material/criar-material/criar-material.component';
import { RespostaHttp } from 'src/app/models/Interface.Destino';

@Component({
  selector: 'app-destino-update',
  templateUrl: './destino-update.component.html',
  styleUrls: ['./destino-update.component.css']
})
export class DestinoUpdateComponent implements OnInit {


  materiaisDestino: Materiais[] = [];
  sedes: Sede[] = [];
  setores: Setor[] = [];
  materiais: Material[] = [];


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
    public dialogRef: MatDialogRef<DestinoUpdateComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit(): void {
    this.buscarMaterial();
    this.buscarSetor();
    this.buscarTodasSedes();
    this.chamarDestino(this.data);
  }

  interfaceMateriais: Materiais = {
    materialId: 0,
    quantidade: 0,
    setorDestino: 0,
    nomeMaterial: null!,
    nomeSetor: null!
  }


  destino: Destino = {
    id: 0,
    sedeId: 0,
    materiaisQntdSetor: this.materiaisDestino,
    status: {
      confirmacao: ""
    },
    nomeSede: ""

  };

  resposta: RespostaHttp = null!;
  chamarDestino(id: any) {
    this.destinoService.buscarDestinoPorId(id).subscribe(res => {
      console.log(res)
      this.resposta = res;
      console.log(this.resposta)
      this.destino.id = this.resposta.id;
      this.destino.sedeId = this.resposta.sedeId;
      this.destino.status.confirmacao = this.resposta.status.confirmacao;

      this.materiaisDestino = res.materiaisQntdSetor;
      console.log(this.materiaisDestino)
    })


  }

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


  criarMaterial(): void {
    const dialogRef: MatDialogRef<CriarMaterialComponent> = this.dialog.open(CriarMaterialComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarMaterial();
    });
  }

  removerMaterial(index: any) {

    this.materiaisDestino.splice(index, 1)
    console.log(this.materiaisDestino)

    this.destinoService.update(this.destino).subscribe(res => {
      console.log(res);
    })
  }
  atualizarDestino() {


    this.destino.materiaisQntdSetor=this.materiaisDestino;
    console.log(this.destino)

    this.destinoService.update(this.destino).subscribe(res => {
      console.log(res);
    })
  }
}
