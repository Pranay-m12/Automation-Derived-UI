import { Component } from '@angular/core';

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

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = 'function x() { // TODO }';
  
  input:{[id:string]:string}={
    "tag":"tagno",
    "plantidx":"plantcode",
    "vuemdbfile":"Vuemdbfile"
  }

  data = {
    'simple key': 'simple value',
    numbers: 1234567,
    'simple list': ['value1', 22222, 'value3'],
    'special value': undefined,
    owner: null,
    'simple obect': {
      'simple key': 'simple value',
      numbers: 1234567,
      'simple list': ['value1', 22222, 'value3'],
      'simple obect': {
        key1: 'value1',
        key2: 22222,
        key3: 'value3',
      },
    },
  };


  output!:OutputSchema;
  arr:Array<fieldArr>=[];

  Create_task(){
    this.arr=[]
    Object.keys(this.input).forEach(key=>{
      this.arr.push({id:key,candidate:{attribute:this.input[key]},type:"find"})
    })
    this.output={asset:"no:nym",rules:this.arr}
  }

  copied(){
    alert("Json content copied successfully")
  }

}
