import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  transformedJsonfinal: any[] = [];
  uncheckedJsonFinal:{ [id: string]: string }={};
  FinalArray: { [id: string]: string } = {};
  extractJson:{[id:string]:any}={};
  demoData:{[id:string]:string}={};
  assetName:string="no:nyh";
  dataType:string="Document";
  attributes:string='tagNo,piperun,equipName,eqpDescription,npd1,status,matmanStatus,systemPath,shortcode,npd2,fluidRequirement,fluidType,turnoverSystem,secondSizeSchedule,vuemdb2TaskFriendlyname,designMaxPressure,designMaxTemperature,nozzleName,materialSpec,oid,location,vuefilename,disciplineDescription,tagName,itemtag,projectTagClassName,lineNo,linktype,tagname,page,eqpType3,shapetype,groupidx,color,documentUrl,primaryP&IdNumber,revisionDate,productionCriticalItem  ';
  fields:string='tagno,tag,displayname,description,npd1,piperun,status,matmanstatus,systempath,shortcode,npd2,fluidrequirement,fluidtype,turnoversystem,secondsizeschedule,equipname,friendlyname,designpressuremaximum,designtemperaturemaximum,nozzlename,pipingclass,oid,plant,mainunit,processunit,location,v3Dtype,disciplinedescription,doctag,projectclass,line,linktype,code,page,equipmenttype3,shapetype,annotationindex,originalcolor,documenturl,doc,notrootdata,revisiondate,productioncritical  ';
}