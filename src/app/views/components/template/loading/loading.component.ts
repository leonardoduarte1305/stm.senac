import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {


  
  isVisible: boolean = false;
  public open() {
    this.isVisible = true;

  }

  public close() {
    this.isVisible = false;
  }
}

