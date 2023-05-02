import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'stm';

  constructor(private service: LoginService) {

  }
  
  ngOnInit(): void {
 
  }
}
