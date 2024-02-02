import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent  {
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.readFile(file).then((jsonContent: any) => {
        console.log('JSON Content:', jsonContent);
        // Handle your JSON content here
      });
    }
}
enteredText: string = '';
enteredText1: string = '';
storeText() {
  console.log('Stored Attributes:', this.enteredText);
}
storeText1() {
  console.log('Stored Derived Property:', this.enteredText1);
}
private readFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(reader.result as string);
        resolve(jsonContent);
      } catch (error) {
        reject('Error parsing JSON file');
      }
    };

    reader.onerror = (e) => {
      reject('Error reading file');
    };

    reader.readAsText(file);
  });
}
}
