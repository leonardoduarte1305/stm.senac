import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { LoginComponent } from './views/components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'stm';

  constructor(private service: LoginService) {

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
