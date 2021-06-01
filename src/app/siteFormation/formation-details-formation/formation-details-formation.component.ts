import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Router, Event } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../servicesFormation/user/user.service'
import { NotificationService } from '../../servicesFormation/notification/notification.service'

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
 
  
  email
  role

  autorized = false
  
  
  
  constructor(private notificationService:NotificationService, public userService:UserService, private _Activatedroute:ActivatedRoute,  private router:Router, public formBuilder:FormBuilder, private http: HttpClient) {
    this.userService.email.subscribe(res =>
      this.email = res
    )

    this.userService.role.subscribe(res => {
      this.role = res
      
      if(res == this.userService.roleAdmin){
        this.autorized = true
      }

    })

    this.myForm = this.formBuilder.group({
      content: [null,Validators.required]
    });
  
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.inisialiserProduit(params.get('id')); 
    });
  }
  
  isLoading = false

  formateur

  inisialiserProduit(idProduit){
    
    this.isLoading = true
    this.http.get(this.userService.baseURL+"/produit/getById/"+idProduit).subscribe(
      res => {
        let response:any = res
        this.isLoading = false; 
        if(response.status){
          this.formation = response.resultat
          this.formateur = response.formateur

          if(this.formateur.email == this.email){
            this.autorized = true
          }else if(this.role == this.userService.roleEtudiant){
            this.verifiedEtudiant(idProduit)
          }
          console.log(response)
        }else{
         // alert(this.notificationService.alertNotConnexion)
        }
      }, err => {
        //alert(this.notificationService.alertNotConnexion)
        this.isLoading = false; 
      }
    );

  }

  condidature

  verifiedEtudiant(idProduit){

    this.isLoading = true
    this.http.get(this.userService.baseURL+"/etudiantFormation/getCondidature/"+idProduit, {
      headers: {
          "authorization": 'Bearer '+localStorage.getItem(this.userService.tokenString)
      }
    }).subscribe(
      res => {
        let response:any = res
        this.isLoading = false; 
        if(response.status){
          this.condidature = response.resultat
   
          if(this.condidature.etat > 0){
            this.autorized = true
          }
          console.log(response)
        }else{
         // alert(this.notificationService.alertNotConnexion)
        }
      }, err => {
        //alert(this.notificationService.alertNotConnexion)
        this.isLoading = false; 
      }
    );
  
  }

  contentChanged(){
    console.log(this.myForm.value.content);
  }


  idCommande = "222"
  isOpenCommande = false;

  closeCommande(){
    this.idCommande = "0";
    this.isOpenCommande = false;
  }

  openCommande(id){
    if(this.role == this.userService.roleFormateur){
      alert("Votre role n'est pas authorizer !!")
    }else if(this.role == ""){
      this.router.navigate(['/InscriptionFormation'])
    }

    this.idCommande = id;
    this.isOpenCommande = true;
  }

  idDetails=1

  changeDetails(id){
    this.idDetails = id
  }



}
