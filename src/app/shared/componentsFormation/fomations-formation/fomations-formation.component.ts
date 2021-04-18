import { Component, OnInit } from '@angular/core';
import {ProduitsFormationService} from '../../../servicesFormation/produitsFormation/produits-formation.service'
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-fomations-formation',
  templateUrl: './fomations-formation.component.html',
  styleUrls: ['./fomations-formation.component.scss']
})
export class FomationsFormationComponent implements OnInit {

  constructor(private categoriesFormationService:ProduitsFormationService, private router:Router) {
    
  }

  formations = []

  ngOnInit(): void {
     this.categoriesFormationService.formations.subscribe(res => {
        this.formations = res
     })
  }

  selectCategorie(route){
    this.router.navigate([route])
  }

}
