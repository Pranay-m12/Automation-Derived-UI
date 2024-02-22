import { Component } from '@angular/core';
import { Service } from '../services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  data: any = '';
  originalJson: any = '';
  transformedJson: any = '';
  searchtransformedJson:any='';
  searchFieldBool:boolean=true;
  firstFieldColor = 'green';
  otherFieldColor = 'yellow';
  constructor(private httpClient: HttpClient,private ss: Service) {}
  anotherArray: { [id: string]: string } = {};
  uncheckedCheckboxes:  { [id: string]: string } = {};
  extractPatterns:{[id:string]:any}={};
  clickedFields: Set<string> = new Set<string>();

  
  editField(id: string) {
    const item = this.searchtransformedJson.find((element: any) => element.id === id);
    if (item) {
      console.log('Editing item:', item);
      const fieldsToEdit = item.id; 
      console.log('Edit fields:', fieldsToEdit);
      const predictionToEdit = item.predicted[0]; 
      console.log('Edit prediction:', predictionToEdit);
    } else {
      console.log('Item not found for ID:', id);
    }
  }
  
  addToAnotherArray(id: string, field: string) {

    if (this.anotherArray[id]){
      this.anotherArray[id]=field;
      console.log('Updated anotherArray:', this.anotherArray);
      console.log('Clicked field',id)

      this.ss.FinalArray=this.anotherArray;
      console.log('fffinal',this.ss.FinalArray);
    }else{
      this.uncheckedCheckboxes[id]=field;
      console.log('Updated uncheckedCheckboxes:', this.uncheckedCheckboxes);
      console.log('Clicked field',id)
      
      this.ss.uncheckedJsonFinal=this.uncheckedCheckboxes;
      console.log('fffinal',this.ss.FinalArray);
    }
  }
  
  isFieldClicked(id: string, field: string): boolean {
    return this.clickedFields.has(`${id}-${field}`);

  }

  toggleEditMode(row: any) {
    row.editMode = !row.editMode;
    if (!row.editMode) {
      if (row.id in this.anotherArray && row.predicted.indexOf(this.anotherArray[row.id])==-1 && this.anotherArray[row.id]!=""){
        row.predicted=[this.anotherArray[row.id]].concat(row.predicted)
      }
      if (row.id in this.uncheckedCheckboxes && row.predicted.indexOf(this.uncheckedCheckboxes[row.id])==-1 && this.uncheckedCheckboxes[row.id]!=""){
        row.predicted=[this.uncheckedCheckboxes[row.id]].concat(row.predicted)
      }
    }
  }

  toggleCheckbox(id: string) {
    console.log(!this.uncheckedCheckboxes[id])
    // If the checkbox is checked, remove its ID from uncheckedCheckboxes
    if (this.uncheckedCheckboxes[id]) {
      this.anotherArray[id]=this.uncheckedCheckboxes[id];
      delete this.uncheckedCheckboxes[id];
    } else {
      // If the checkbox is unchecked, add its ID to uncheckedCheckboxes
      this.uncheckedCheckboxes[id] = this.anotherArray[id];
      delete this.anotherArray[id];
    }
    this.ss.FinalArray=this.anotherArray
    this.ss.uncheckedJsonFinal=this.uncheckedCheckboxes
    console.log('Updated anotherArray:', this.anotherArray);
    console.log('Updated uncheckedCheckboxes:', this.uncheckedCheckboxes);
  }

  async onClickTest() {
    console.log('Stored Derived Property:', this.ss.fields.split(","));
    console.log('Stored Attributes:', this.ss.attributes.split(","));

    this.ss.assetName=this.ss.assetName;
    this.ss.dataType=this.ss.dataType;
    const test = {
      "fields": this.ss.fields.split(","),
      "attributes": this.ss.attributes.split(",")
    };
    await this.httpClient.post('http://127.0.0.1:8000/', test).subscribe(
      (response) => {
        this.data = response;
        console.log('data', this.data);
    
       
        this.transformedJson = Object.keys(this.data).map((key) => ({
          id: key,
          predicted: [
            ...this.data[key].both,
            this.data[key].model[0],
            this.data[key].edit[0],
            ...this.data[key]["model&edit"]
          ].filter((value, index, self) => {
              return value!=undefined && self.indexOf(value) === index;
            }),
        }));
        console.log('Transformed JSON:', this.transformedJson);
        this.ss.transformedJsonfinal = this.transformedJson;
        this.searchtransformedJson=this.transformedJson;
        console.log('final',this.ss.transformedJsonfinal);
        this.updatearray(this.transformedJson);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private updatearray(transformedJson:any){
    transformedJson.forEach((item: any) => {
      const itemId = item.id; 
      
      
      if (item.predicted && item.predicted.length > 0 && !this.anotherArray[itemId]) {
        const predictedValue = item.predicted[0]; 
        this.anotherArray[itemId] = predictedValue;
      }
    });
    this.ss.FinalArray=this.anotherArray;
    console.log('fffinal1',this.ss.FinalArray);
  }
  showTextbox = true;

  toggleView() {
    this.showTextbox = !this.showTextbox; 
  }

  handleClick(field: string) {
    console.log('Clicked:', field);
  }

  changeAsset(asset:string){
    console.log(asset)
    this.ss.assetName=asset
    console.log(this.ss.assetName)
  }

  toggleSearch(){
    this.searchFieldBool=!this.searchFieldBool;
    this.searchtransformedJson=this.transformedJson
  }

  searchField(searchName:string,field:boolean){
    if (field){
      this.searchtransformedJson=this.transformedJson.filter((x:any)=>x.id.includes(searchName))
    }else{
      this.searchtransformedJson=this.transformedJson.filter((x:any)=>{
        for (let attr in x.predicted){
          if (x.predicted[attr].includes(searchName)){
            return true
          }
        }
        return false
      })
    }
  }

  toggleExtractMode(row:any){
    if (!this.extractPatterns[row.id]){
      this.extractPatterns[row.id]={
        "extract":"",
        "pattern":""
      }
    }else{
      if (this.extractPatterns[row.id].editMode && this.extractPatterns[row.id].pattern==""){
        delete this.extractPatterns[row.id]
      }
    }
    this.extractPatterns[row.id].editMode=!this.extractPatterns[row.id].editMode
    this.extractPatterns=this.ss.extractJson
  }
}
