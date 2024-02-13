import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  transformedJsonfinal: any[] = [];
  uncheckedJsonFinal:{ [id: string]: string }={};
  FinalArray: { [id: string]: string } = {};
  extractJson:{[id:string]:any}={};
  assetName:string="";
  dataType:string="";
}