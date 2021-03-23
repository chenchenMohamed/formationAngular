import { Component, OnInit } from '@angular/core';
import {CategoriesFormationService} from '../../../servicesFormation/categoriesFormation/categories-formation.service'
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-fomations-formation',
  templateUrl: './fomations-formation.component.html',
  styleUrls: ['./fomations-formation.component.scss']
})
export class FomationsFormationComponent implements OnInit {

  constructor(private categoriesFormationService:CategoriesFormationService, private router:Router) {
    
  }

  categories = []

  ngOnInit(): void {
     this.categoriesFormationService.categories.subscribe(res => {
        this.categories = res
     })
  }

  selectCategorie(route){
    this.router.navigate([route])
  }

}
