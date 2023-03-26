import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItinerarioService } from 'src/app/services/itinerario.service';

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
export class ItinerarioCreateComponent {
  displayedColumns: string[] = ['Material', 'QTD', 'SetorDestinatario'];
  dataSource = ELEMENT_DATA;

constructor(
  private router: Router,
  private servico:ItinerarioService
){

}

navigationToItinerarios(){
  this.router.navigate(['itinerarios']);
}
msg():void{
  this.servico.mensagem("Material Adicionado ao destino");
}
}
