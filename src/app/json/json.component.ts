import { Component } from '@angular/core';

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
  constructor(private httpClient: HttpClient) {}

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
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private flattenAndFilterUndefined(arrays: (any[] | undefined)[]): any[] {
    return arrays.reduce<any[]>((acc, current) => acc.concat(current || []), []).filter((value) => value !== undefined);
  }

  handleClick(field: string) {
    console.log('Clicked:', field);
    // Add more logic here based on your requirements
  }
  }

