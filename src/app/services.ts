import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  transformedJsonfinal: any[] = [];
  FinalArray: { [id: string]: string } = {};
}