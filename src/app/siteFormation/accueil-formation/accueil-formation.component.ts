import { Component, OnInit } from '@angular/core';
import { ProduitsFormationService } from '../../servicesFormation/produitsFormation/produits-formation.service'

@Component({
  selector: 'app-accueil-formation',
  templateUrl: './accueil-formation.component.html',
  styleUrls: ['./accueil-formation.component.scss']
})
export class AccueilFormationComponent implements OnInit {

  categories1=[]
  categories2=[]
  categories3=[]
  categories4=[]

  constructor(public produitsFormationService:ProduitsFormationService) { 
    
    this.categories1=[{categorie: this.produitsFormationService.produitMeilleurVenteString}]
    this.categories2=[{categorie: this.produitsFormationService.produitNouveauString}]
    this.categories3=[{categorie: this.produitsFormationService.produitSpecialsString}]
    this.categories4=[{categorie: this.produitsFormationService.produitPromoString}]

  }

  ngOnInit(): void {
  }

}
