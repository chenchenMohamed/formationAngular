import { Component, OnInit } from '@angular/core';
import {FormateursFormationService} from '../../../servicesFormation/formateursFormation/formateurs-formation.service'
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-list-formateurs',
  templateUrl: './list-formateurs.component.html',
  styleUrls: ['./list-formateurs.component.scss']
})
export class ListFormateursComponent implements OnInit {

  
  constructor(private formateursFormationService:FormateursFormationService, private router:Router) {
    
  }

  formateurs = []

  ngOnInit(): void {
     this.formateursFormationService.formateurs.subscribe(res => {
       this.formateurs = res
     })
  }

  selectCategorie(route){
    this.router.navigate([route])
  }

}