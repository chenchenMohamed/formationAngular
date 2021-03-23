import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
declare var CKEDITOR: any;
@Component({
  selector: 'app-formation-details-formation',
  templateUrl: './formation-details-formation.component.html',
  styleUrls: ['./formation-details-formation.component.scss']
})
export class FormationDetailsFormationComponent implements OnInit {
  
  formation
  formations:any=[]
  myForm: FormGroup;
 
  ckeditorConten
  
  constructor(public formBuilder:FormBuilder, private http: HttpClient) {
     
    this.http.get("./assets/constantes/formations.json").subscribe(res => {
      
      this.formations = res
      if(this.formations.length > 0){
        this.formation = this.formations.filter(x=> x.id == 1)[0]
      }
      
    })

    this.myForm = this.formBuilder.group({
      content: [null,Validators.required]
    });
  
  }

  ngOnInit(): void {
  }

  contentChanged(){
    console.log(this.myForm.value.content);
  }

}
