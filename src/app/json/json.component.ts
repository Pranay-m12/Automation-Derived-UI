import { Component } from '@angular/core';
import { Service } from '../services';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';

interface result {  
  both: Number;  
  name: String;  
  email: String;  
  gender: String;  
}  
@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})

export class JsonComponent {
  enteredText: string = '';
  enteredText1: string = '';
  data: any = '';
  originalJson: any = '';
  transformedJson: any = '';
  firstFieldColor = 'green';
  otherFieldColor = 'yellow';
  constructor(private httpClient: HttpClient,private ss: Service) {}
  anotherArray: { [id: string]: string[] } = {};
  clickedFields: Set<string> = new Set<string>();
 
  addToAnotherArray(id: string, field: string) {
    
    if (!this.anotherArray[id]) {
      this.anotherArray[id] = [];
    }
    this.transformedJson.forEach((item: any) => {
      const itemId = item.id; // Get the ID of the current item
      
      // Check if the item has a predicted value and it's not already stored in anotherArray
      if (item.predicted && item.predicted.length > 0 && !this.anotherArray[itemId]) {
        const predictedValue = item.predicted[0]; // Get the first predicted value
        // Store the ID and predicted value in anotherArray for the current ID
        this.anotherArray[itemId] = [predictedValue];
      }
    });
    const index = this.anotherArray[id].indexOf(field);
    console.log(index);
    if (index !== -1) {
      this.anotherArray[id].splice(index, 1);
    }
    this.anotherArray[id].push(field);


    console.log('Updated anotherArray:', this.anotherArray);

    const key = `${id}-${field}`;
    if (this.clickedFields.has(key)) {
      this.clickedFields.delete(key);
    } else {
      this.clickedFields.add(key);
    }
  }
  isFieldClicked(id: string, field: string): boolean {
    return this.clickedFields.has(`${id}-${field}`);
  }
  // toggleButtonStatus(field: any) {
  //   field.clicked = !field.clicked;
  // }

  // final(id:string,field:string,field1:any) {
  //    this.addToAnotherArray(id,field);
  //    this.toggleButtonStatus(field1);
  // }
  async onClickTest() {
    console.log('Stored Derived Property:', this.enteredText1.split(","));
    console.log('Stored Attributes:', this.enteredText.split(","));

    const test = {
      "fields": this.enteredText1.split(","),
      "attributes": this.enteredText.split(",")
    };
  

    await this.httpClient.post('http://127.0.0.1:8000/', test).subscribe(
      (response) => {
        this.data = response;
        console.log('data', this.data);
    
        // Transform data and log transformedJson
        this.transformedJson = Object.keys(this.data).map((key) => ({
          id: key,
          predicted: this.flattenAndFilterUndefined([
            this.data[key].both,
            this.data[key].edit[0],
            this.data[key].model[0],
            this.data[key]["model&edit"][0],]),
        }));
        console.log('Transformed JSON:', this.transformedJson);
        this.ss.transformedJsonfinal = this.transformedJson;
        console.log('final',this.ss.transformedJsonfinal);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private flattenAndFilterUndefined(arrays: (any[] | undefined)[]): any[] {
    return arrays.reduce<any[]>((acc, current) => acc.concat(current || []), []).filter((value) => value !== undefined).filter((value, index, self) => self.indexOf(value) === index);
    ;
  }
  
  
  

  handleClick(field: string) {
    console.log('Clicked:', field);
    // Add more logic here based on your requirements
  }
  }

