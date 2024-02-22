import { Component } from '@angular/core';
import { Service } from '../services';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  constructor(private httpClient: HttpClient,private ss: Service) {}
  attributes:string=this.ss.attributes;
  fields:string=this.ss.fields;
  source:string = this.ss.assetName;
  type:string = this.ss.dataType;

  inputChange(){
    this.ss.assetName=this.source;
    this.ss.dataType=this.type;
    this.ss.attributes=this.attributes;
    this.ss.fields=this.fields
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
        let matchedString:string = '';
      this.readFile(file).then((jsonContent: any) => {
        console.log('JSON Content:', jsonContent);
        const jsonString: string = JSON.stringify(jsonContent);
        const regexPattern: RegExp = /Document\":{\"([^\"]+)/;
        const matches: RegExpMatchArray | null = jsonString.match(regexPattern);
        if (matches !== null) {
           matchedString = matches[1];
           console.log("match",matchedString);
        }
        console.log('JSON Content String:', jsonString);
        const attributes = jsonContent.Document[matchedString].attributes;
        this.attributes=attributes.toString();
        console.log(this.attributes);
      });
    }
  }

  onFileSelected1(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.readFile(file).then((jsonContent: any) => {
        console.log('JSON Content:', jsonContent);
        const attributes = jsonContent.derived;
        this.fields=attributes.toString();
        console.log(this.fields);
      });
    }
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

  onFileSelected2(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const headers: string[] = [];
      
  
      if (worksheet['!ref']) {
        const range: XLSX.Range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = { c: C, r: range.s.r };
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          headers.push(worksheet[cellRef].w);
        }
        console.log('Headers:', headers);
        const headersString: string = headers.join(', '); 
        this.attributes=headersString;
        console.log('Headers:',  this.attributes);
      } else {
        console.error('Worksheet range is undefined');
      }
    };

    reader.readAsArrayBuffer(file);
  }
}
