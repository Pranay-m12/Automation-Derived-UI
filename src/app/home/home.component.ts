import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent  {
  
enteredText: string = '';
enteredText1: string = '';

storeText() {
  console.log('Stored Derived Property:', this.enteredText1);
  console.log('Stored Attributes:', this.enteredText);
}

}
