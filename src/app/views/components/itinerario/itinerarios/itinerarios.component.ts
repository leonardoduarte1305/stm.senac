import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario';
import { ItinerarioService } from 'src/app/services/itinerario.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css']
})
export class ItinerariosComponent {

  itinerarios: Itinerario[] = [];

  constructor(
    private router: Router,
    private service: ItinerarioService

  ) {


  }
  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.itinerarios = resposta;
   console.log(this.itinerarios)
    })
  }
getId(s:Itinerario){
alert(s.id);
}
}
