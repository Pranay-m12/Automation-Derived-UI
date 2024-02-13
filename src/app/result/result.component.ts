import { Component } from '@angular/core';
import { Service } from '../services';
interface fieldArr{
  id:string,
  candidate:{[attributes:string]:string}
  extract?:string;
  pattern?:string;
  type:string,
}
interface DerivedOutputSchema{
  source:string,
  type:string,
  rules:Array<fieldArr>
}

interface OtherOutputSchema{
  id:string,
  source:string,
  type:string,
  derive:string,
  pattern?:string,
  extract?:string
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
  asset:string="";
  type:string="";
  extractJson:{[id:string]:any}={};

  derivedOutput!:DerivedOutputSchema;
  otherOutput:Array<OtherOutputSchema>=[];
  arr:Array<fieldArr>=[];

  Create_task(){
    this.asset=this.ss.assetName
    this.type=this.ss.dataType
    this.extractJson=this.ss.extractJson;
    this.arr=[]
    Object.keys(this.ss.FinalArray).forEach(key=>{
      this.arr.push({
        id: key.trim(),
        candidate: { attribute: this.ss.FinalArray[key].trim() },
        ...(this.extractJson[key.trim()] && {pattern:this.extractJson[key.trim()].pattern}),
        ...(this.extractJson[key.trim()] && {extract:this.extractJson[key.trim()].extract}),
        type: 'find',
      });
    })
    this.derivedOutput={source:this.asset,type:this.type,rules:this.arr}
    //For other output
    this.otherOutput=[]
    Object.keys(this.ss.uncheckedJsonFinal).forEach(key=>{
      this.otherOutput.push({
        id: key.trim(),
        source: this.asset,
        type: this.type,
        derive: this.ss.uncheckedJsonFinal[key].trim(),
        ...(this.extractJson[key.trim()] && {pattern:this.extractJson[key.trim()].pattern}),
        ...(this.extractJson[key.trim()] && {extract:this.extractJson[key.trim()].extract})
      });
    })
  }

  copied(){
    alert("Json content copied successfully")
  }

}