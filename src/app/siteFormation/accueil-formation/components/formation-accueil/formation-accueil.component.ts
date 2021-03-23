import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation-accueil',
  templateUrl: './formation-accueil.component.html',
  styleUrls: ['./formation-accueil.component.scss']
})
export class FormationAccueilComponent implements OnInit {

  constructor() {
    
  }

  formations = []

  ngOnInit(): void {
  }


}
