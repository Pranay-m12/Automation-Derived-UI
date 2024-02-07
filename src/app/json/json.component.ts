import { Component } from '@angular/core';
import { Service } from '../services';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
  enteredText: string = 'discipline_code,creation_date,handover_required,revision_date,company_name,cmpy_seq_nr,document_description_240,status_code,title,percentage_complete,publish_file,subclass_code,maintained_by,subclass_type_description,sucl_seq_nr,publication_file,handover_completed,RHLLEGDOC,document_url,document_nr,TITLE,subclass_description,proj_seq_nr,description,is_latest,latest_rev_creation_date,email_attachment_list,document_type_select,actual_start_month,clas_seq_nr,asst_seq_nr,publication_file_required,asset_code,RHLPROJECT,revision_creation_date_month,pk_seq_nr,class_code,document_remarks,docs_seq_nr,created_by,DOCUMENT_NUMBER,actual_start_date,doty_seq_nr,active_ind,default_asst_seq_nr,checked_out_ind,project_code,latest_revision_code,revision_creation_date_week,company_code,dost_seq_nr,latest_change_date_pub_file,revision_code,has_rev_outstanding_ce_copy,actual_start_date_week,last_refresh_date,revision_order,source_file_required,suty_seq_nr,discipline_description,latest_rev_creation_date_print,project_title,originator,source_file,actual_start_date_print,disc_seq_nr,actual_start_week,status_description,reco_seq_nr,class_description,asset_description,latest_dore_seq_nr,maintenance_date,company_document_nr,free_text_ind,subclass_type_code,document_type,document_type_description,latest_change_date_subq,latest_rev_creation_date_slt,swp_parent_string,dore_seq_nr,in_maintenance';
  enteredText1: string = 'documentStatusCode,documentType,publishFile,isLatest,k2Handle, isActive,title,isCheckedOut,isLive,revision,project,documentStatusDescription,disciplineDescription,revisionFileName,revisionDate,plantCode,latestChangeDateSubq,discipline,dataStore,documentTypeDescription,externalLink,description';
  data: any = '';
  originalJson: any = '';
  transformedJson: any = '';
  firstFieldColor = 'green';
  otherFieldColor = 'yellow';
  constructor(private httpClient: HttpClient,private ss: Service) {}
  anotherArray: { [id: string]: string } = {};
  clickedFields: Set<string> = new Set<string>();
  
  addToAnotherArray(id: string, field: string) {
    
    if (!this.anotherArray[id]) {
      this.anotherArray[id] = "";
    }
  
    
    this.anotherArray[id]=field;


    console.log('Updated anotherArray:', this.anotherArray);
    console.log('Clicked field',id)

    const key = `${id}-${field}`;
    if (this.clickedFields.has(key)) {
      this.clickedFields.delete(key);
    } else {
      this.clickedFields.add(key);
    }
    
    this.ss.FinalArray=this.anotherArray;
    console.log('fffinal',this.ss.FinalArray);
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
        this.ss.transformedJsonfinal = this.transformedJson;
        console.log('final',this.ss.transformedJsonfinal);
        this.transformedJson.forEach((item: any) => {
          const itemId = item.id; // Get the ID of the current item
          
          // Check if the item has a predicted value and it's not already stored in anotherArray
          if (item.predicted && item.predicted.length > 0 && !this.anotherArray[itemId]) {
            const predictedValue = item.predicted[0]; // Get the first predicted value
            // Store the ID and predicted value in anotherArray for the current ID
            this.anotherArray[itemId] = predictedValue;
          }
        });
        this.ss.FinalArray=this.anotherArray;
        console.log('fffinal1',this.ss.FinalArray);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private flattenAndFilterUndefined(arrays: (any[] | undefined)[]): any[] {
    return arrays.reduce<any[]>((acc, current) => acc.concat(current || []), []).filter((value) => value !== undefined).filter((value, index, self) => self.indexOf(value) === index);
  
  }
  showTextbox = true; // Initial state, showing textbox by default

  toggleView() {
    this.showTextbox = !this.showTextbox; // Toggle the value
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.readFile(file).then((jsonContent: any) => {
        console.log('JSON Content:', jsonContent);
        // Handle your JSON content here
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
    // Add more logic here based on your requirements
  }

  changeAsset(asset:string){
    console.log(asset)
    this.ss.assetName=asset
    console.log(this.ss.assetName)
  }

  }

