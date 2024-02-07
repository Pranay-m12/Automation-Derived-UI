import { Component } from '@angular/core';
import { Service } from '../services';
interface fieldArr{
  id:string,
  candidate:{[attributes:string]:string}
  type:string,
}
interface OutputSchema{
  asset:string,
  rules:Array<fieldArr>
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  constructor(private ss: Service) {}
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = 'function x() { // TODO }';
  
  input:{[id:string]:string}={
  }

  outputTxt:string="";
  output!:OutputSchema;
  arr:Array<fieldArr>=[];

  Create_task(){
    this.arr=[]
    this.input= this.ss.FinalArray;
    Object.keys(this.input).forEach(key=>{
      this.arr.push({id:key,candidate:{attribute:this.input[key]},type:"find"})
    })
    this.output={asset:"no:nym",rules:this.arr}
    this.outputTxt=JSON.stringify(this.output)
    console.log(this.output)
  }

}