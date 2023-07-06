import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  show: Boolean = true;

  nome: string = ""
  role: string = ""
  constructor(
    private service: LoginService,
    private route: Router
  ) {

  }


  sairDoSistema() {

    this.service.removeToken()



  }

  mostrarMenu: boolean = false;
  tipoUser = new EventEmitter<boolean>();
  ngOnInit(): void {



    this.service.mostrarMenu.subscribe(res => {
      if (res) {
        this.mostrarMenu = true;

        setTimeout(() => {
          this.nome = localStorage.getItem('nome')!;
          this.role = localStorage.getItem('role')!;
      
        }, 20);


      } else {
        this.mostrarMenu = false;

      }



    })

  }

}
