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
  asset:string="no:nyh";

  output:OutputSchema={asset:this.asset,rules:[]};
  arr:Array<fieldArr>=[];

  Create_task(){
    this.arr=[]
    Object.keys(this.ss.FinalArray).forEach(key=>{
      this.arr.push({id:key.trim(),candidate:{attribute:this.ss.FinalArray[key].trim()},type:"find"})
    })
    this.output={asset:this.asset,rules:this.arr}
  }

  copied(){
    alert("Json content copied successfully")
  }

}