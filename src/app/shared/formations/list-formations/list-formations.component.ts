import { Component, OnInit } from '@angular/core';
import {ProduitsFormationService} from '../../../servicesFormation/produitsFormation/produits-formation.service'
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.scss']
})
export class ListFormationsComponent implements OnInit {

  constructor(private produitsFormationService:ProduitsFormationService, private router:Router) {
    
  }

  formations = []

  ngOnInit(): void {
     this.produitsFormationService.formations.subscribe(res => {
       this.formations = res
     })
  }

  selectCategorie(route){
    this.router.navigate([route])
  }

}