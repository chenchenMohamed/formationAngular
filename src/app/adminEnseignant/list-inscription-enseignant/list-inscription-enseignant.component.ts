import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoriesFormationService } from '../../servicesFormation/categoriesFormation/categories-formation.service'
import { UserService } from '../../servicesFormation/user/user.service'
import { ProduitsFormationService } from '../../servicesFormation/produitsFormation/produits-formation.service'
import { NotificationService } from '../../servicesFormation/notification/notification.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-inscription-enseignant',
  templateUrl: './list-inscription-enseignant.component.html',
  styleUrls: ['./list-inscription-enseignant.component.scss']
})
export class ListInscriptionEnseignantComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private notificationService:NotificationService, private http: HttpClient, private categoriesServices: CategoriesFormationService, private userService:UserService, public productService:ProduitsFormationService) { 
  }

  
 idFormation = ""
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.getFormations(params.get('id')); 
      this.idFormation = params.get('id')
    });
  }

  isLoading = false
  page=1
  totalPage=1

  inscriptions=[]

  getFormations(idFormation){
    
    if(this.isLoading){
      return
    }

    this.isLoading = true

    let request = {page:this.page, limitItems: 10, listCategories:[]}
    
    this.http.post(this.userService.baseURL+"/etudiantFormation/listInscriptions/"+idFormation, request, 
    {
      headers: {
          "authorization": 'Bearer '+localStorage.getItem(this.userService.tokenString)
      }
    }).subscribe(

      res => {
        this.isLoading = false
        let resultat:any
        console.log(resultat)
        resultat = res
        if(resultat.status){
          console.log(resultat)
          this.page = resultat.resultat.page
          this.totalPage = resultat.resultat.pages
          this.inscriptions = resultat.resultat.docs
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
 

  activerEtudiant(idInscription){
    
    if(this.isLoading){
      return
    }

    this.isLoading = true

    this.http.post(this.userService.baseURL+"/etudiantFormation/activerEtudiant/"+idInscription, {}, 
    {
      headers: {
          "authorization": 'Bearer '+localStorage.getItem(this.userService.tokenString)
      }
    }).subscribe(

      res => {
        this.isLoading = false
        let resultat:any
        console.log(resultat)
        resultat = res
        if(resultat.status){
           alert("Votre etudiant est activé")
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  setPage(newPage: number) {
    //    this.scrollTop()
        this.page = newPage
        this.getFormations(this.idFormation)
  }

}
