import { Component } from '@angular/core';
import { Service } from '../services';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import * as XLSX from 'xlsx';

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
  attributes: string = 'discipline_code,creation_date,handover_required,revision_date,company_name,cmpy_seq_nr,document_description_240,status_code,title,percentage_complete,publish_file,subclass_code,maintained_by,subclass_type_description,sucl_seq_nr,publication_file,handover_completed,RHLLEGDOC,document_url,document_nr,TITLE,subclass_description,proj_seq_nr,description,is_latest,latest_rev_creation_date,email_attachment_list,document_type_select,actual_start_month,clas_seq_nr,asst_seq_nr,publication_file_required,asset_code,RHLPROJECT,revision_creation_date_month,pk_seq_nr,class_code,document_remarks,docs_seq_nr,created_by,DOCUMENT_NUMBER,actual_start_date,doty_seq_nr,active_ind,default_asst_seq_nr,checked_out_ind,project_code,latest_revision_code,revision_creation_date_week,company_code,dost_seq_nr,latest_change_date_pub_file,revision_code,has_rev_outstanding_ce_copy,actual_start_date_week,last_refresh_date,revision_order,source_file_required,suty_seq_nr,discipline_description,latest_rev_creation_date_print,project_title,originator,source_file,actual_start_date_print,disc_seq_nr,actual_start_week,status_description,reco_seq_nr,class_description,asset_description,latest_dore_seq_nr,maintenance_date,company_document_nr,free_text_ind,subclass_type_code,document_type,document_type_description,latest_change_date_subq,latest_rev_creation_date_slt,swp_parent_string,dore_seq_nr,in_maintenance  ';
  fields: string = 'documentStatusCode,documentType,publishFile,isLatest,k2Handle, isActive,title,isCheckedOut,isLive,revision,project,documentStatusDescription,disciplineDescription,revisionFileName,revisionDate,plantCode,latestChangeDateSubq,discipline,dataStore,documentTypeDescription,externalLink,description  ';
  source:string = 'no:nhy';
  type:string = 'Document';
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
  // toggleButtonStatus(field: any) {
  //   field.clicked = !field.clicked;
  // }

  // final(id:string,field:string,field1:any) {
  //    this.addToAnotherArray(id,field);
  //    this.toggleButtonStatus(field1);
  // }
  toggleEditMode(row: any) {
    row.editMode = !row.editMode;
    if (!row.editMode && row.predicted.indexOf(this.anotherArray[row.id])==-1) {
      row.predicted=[this.anotherArray[row.id]].concat(row.predicted)
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
    console.log('Stored Derived Property:', this.fields.split(","));
    console.log('Stored Attributes:', this.attributes.split(","));

    this.ss.assetName=this.source;
    this.ss.dataType=this.type;
    const test = {
      "fields": this.fields.split(","),
      "attributes": this.attributes.split(",")
    };
    await this.httpClient.post('http://127.0.0.1:8000/', test).subscribe(
      (response) => {
        this.data = response;
        console.log('data', this.data);
    
       
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
  private flattenAndFilterUndefined(arrays: (any[] | undefined)[]): any[] {
    return arrays.reduce<any[]>((acc, current) => acc.concat(current || []), []).filter((value) => value !== undefined).filter((value, index, self) => self.indexOf(value) === index);
  
  }
  showTextbox = true;

  toggleView() {
    this.showTextbox = !this.showTextbox; 
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


