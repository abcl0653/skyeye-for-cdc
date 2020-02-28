namespace cdc;
 
 using { cdc.Grids, cdc.Hospitals } from './master';
 using { cuid, managed } from '@sap/cds/common';
 entity Patients  {
     key ID: Integer;
     personalID: String;
     name: String(20);
     sex: String(1);
     age: Integer;
     telephone: String(20);
     address: String(100);
     grid: Association to Grids; 
     isolationStatus: Boolean;
     isolationDate: Date;
     predictIsolationEnd: Date;
     PatientTrack : Association to many PatientTrack on PatientTrack.patient = $self;
     PatientIntimateContact : Association to many PatientIntimateContact on PatientIntimateContact.patient = $self
 }

 entity Cases : managed { 
     key ID: Integer;
     patient: Association to Patients;
     hospital: Association to Hospitals;
     type: String(10); //确诊，疑似，死亡，重症，治愈
 }

 entity PatientTrack: cuid {
     patient: Association to Patients;
     date: Date;
     activity: String(200);

 }

 entity PatientIntimateContact : cuid {
     patient: Association to Patients;
     date: Date;
     intimateContact: Association to Patients;
 }