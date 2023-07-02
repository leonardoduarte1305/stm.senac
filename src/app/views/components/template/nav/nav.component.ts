import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  show: Boolean = true;


  constructor(
    private service: LoginService,
    private route: Router
  ) {

  }


  sairDoSistema() {
    this.service.removeToken()

  }

  mostrarMenu: boolean = false;
  ngOnInit(): void {
    
    this.service.mostrarMenu.subscribe(res => {
      if (res) {
        this.mostrarMenu = true;
        
      } else {
        this.mostrarMenu = false;
      }
    })
    
  }
}
