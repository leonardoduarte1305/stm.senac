import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.css']
})
export class ItinerariosComponent {

  nome: String = "ss";
  constructor(
    private router: Router

  ) {

  }
  navigationToCreate(): void {
    this.router.navigate(['itinerarios/create'])
  }


}
