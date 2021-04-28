import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private notificationService:NotificationService) { 
    this.inisialiseRoleAndEmail()
  }
  
  //baseURL = "https://formations.herokuapp.com"
  baseURL = "http://localhost:3000"
  baseURLAngular = "http://localhost:4200"
  
  tokenString = "tokenString"
  roleString = "roleString"
  emailString = "emailString"
  
  roleAdmin = "admin"
  roleEtudiant = "Etudiant"
  roleFormateur = "Formateur"
  
  varRole=""
  role=new BehaviorSubject(this.varRole)
  roleChange=this.role.asObservable()  
  
  varEmail=this.notificationService.compteString
  email=new BehaviorSubject(this.varEmail)
  emailChange=this.email.asObservable()  

  setTokenAndRole(data){
    localStorage.setItem(this.tokenString, data.token)
    localStorage.setItem(this.roleString, data.role)
    localStorage.setItem(this.emailString, data.email)
  
    this.varRole = data.role;
    this.role.next(this.varRole)

    this.varEmail = data.email;
    this.email.next(this.varEmail)
  }

  deconnexion(){
    localStorage.setItem(this.tokenString, "")
    localStorage.setItem(this.roleString, "")

    this.varRole = "";
    this.role.next(this.varRole)
  }

  inisialiseRoleAndEmail(){
    var newRole = localStorage.getItem(this.roleString)
    var newEmail = localStorage.getItem(this.emailString)
    
    if(newRole != this.roleEtudiant && newRole != this.roleAdmin && newRole != this.roleFormateur){
      this.role.next("")
    }else{
      this.varRole = newRole
      this.role.next(newRole)

      this.varEmail = newEmail
      this.email.next(newEmail)
    }
  }

  getEmail(){
    return this.varEmail
  }

}
