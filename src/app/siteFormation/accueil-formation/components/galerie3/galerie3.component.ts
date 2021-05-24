import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoriesFormationService } from '../../../../servicesFormation/categoriesFormation/categories-formation.service'
import { UserService } from '../../../../servicesFormation/user/user.service'
import { ProduitsFormationService } from '../../../../servicesFormation/produitsFormation/produits-formation.service'
import { NotificationService } from '../../../../servicesFormation/notification/notification.service'

@Component({
  selector: 'app-galerie3',
  templateUrl: './galerie3.component.html',
  styleUrls: ['./galerie3.component.scss']
})
export class Galerie3Component implements OnInit {

  centerFormations=[]
  constructor(private notificationService:NotificationService, private http: HttpClient, private categoriesServices: CategoriesFormationService, public userService:UserService, public productService:ProduitsFormationService) { 
  }

  ngOnInit(): void {
    this.getFormations()
  }

  isLoading = false
  page=1
  totalPage=1


  getFormations(){
    
    if(this.isLoading){
      return
    }

    this.isLoading = true

    let request = {page:this.page, limitcenterFormations: 10, listCategories:[]}
    
    this.http.post(this.userService.baseURL+"/centreFormation/CentreFormations", request).subscribe(

      res => {
        this.isLoading = false
        let resultat:any
        console.log(resultat)
        resultat = res
        if(resultat.status){
          /*console.log(resultat)
          this.page = resultat.resultat.page
          this.totalPage = resultat.resultat.pages*/
          this.centerFormations = resultat.resultat
          this.inialiserProduits()
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
        this.getFormations()
  }

  width

  inialiserProduits(){
    
    var element = document.getElementById('foo');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    this.width = positionInfo.width;
    console.log(height)
    console.log(this.width)

    var elements = document.getElementsByClassName('centerFormations-list');

    if(this.width < 566){
      this.width  = this.width / 1 - 20
    }else  if(this.width < 860){
      this.width  = this.width / 2 - 20
    }else if(this.width < 960){
      this.width  = this.width / 3 - 20
    }else {
      this.width  = this.width / 4 - 20
    }
    
    for(let i = 0; i < elements.length; i++){
      elements[i].removeAttribute("style")
      elements[i].setAttribute("style", "margin:10px;width:"+this.width+"px; display:inline;")
    }

    this.scrollAuto()
    
  
  }


  /*ngAfterViewChecked() {
    var element = document.getElementById('foo');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    console.log(height)
    console.log(width)
  }*/

  
  scrollGlobal = 0
  coifficient = 1
  nbrPause = 0
 
 
 
  setTimePauseAnimation(){

    this.nbrPause++
    setTimeout(() => {
      this.nbrPause--
    },  2000);
 
  }

  isScrolle = false
  scrollManuelle(entier){
    this.setTimePauseAnimation()

    if(this.isScrolle){
      return
    }
    

    this.isScrolle = true
    
    var elements = document.getElementsByClassName('scroll-container');
    
    var b = elements[0].scrollWidth - elements[0].clientWidth;

    let encient = 0 
   
    let posCurrent = elements[0].scrollLeft 

    if(posCurrent == 0){
        ok = false
        this.coifficient = 1
        encient = posCurrent + (this.width + 20) * entier
    }else if(posCurrent == b){
        ok = false
        this.coifficient = -1
        encient = posCurrent + (this.width + 20) * entier
    }else{
      
      let i = 0
      var ok =true
      while(i < this.centerFormations.length && ok == true){
        if(((this.width + 20) * i) == posCurrent){
          ok = false
          encient = posCurrent + (this.width + 20) * entier
        }
        i++
      }

      if(ok){
        i = 0
        while(i < this.centerFormations.length && ok == true){
          if(((this.width + 20) * i) > posCurrent){
            ok = false
            if( entier == 1){
              encient = (this.width + 20) * i
            }else{
              encient = (this.width + 20) * (i-1)
            }
          }
          i++
        }
      }
      
    } 
        
    elements[0].scroll({
      top: 0, 
      left: encient, 
      behavior: 'smooth'
    });
    
   
    setTimeout(() => {
      this.isScrolle = false
    },  300);
      
  }
  
  scrollAuto(){
    
    console.log("start scroll auto")

    if(this.nbrPause != 0){
      setTimeout(() => {
        this.scrollAuto()
      },  3000);
      
      return
    }

    console.log("end scroll auto")

    var elements = document.getElementsByClassName('scroll-container');
    
    var b = elements[0].scrollWidth - elements[0].clientWidth;

    let encient = 0 
   
    let posCurrent = elements[0].scrollLeft 

    console.log(elements.length)

    if(posCurrent == 0){
        ok = false
        this.coifficient = 1
        encient = posCurrent + (this.width + 20) * this.coifficient
    }else if(posCurrent == b){
        ok = false
        this.coifficient = -1
        encient = posCurrent + (this.width + 20) * this.coifficient
    }else{
      
      let i = 0
      var ok =true
      while(i < this.centerFormations.length && ok == true){
        if(((this.width + 20) * i) == posCurrent){
          ok = false
          encient = posCurrent + (this.width + 20) * this.coifficient
        }
        i++
      }

      if(ok){
        i = 0
        while(i < this.centerFormations.length && ok == true){
          if(((this.width + 20) * i) > posCurrent){
            ok = false
            encient = (this.width + 20) * i
          }
          i++
        }
      }
      
    } 
        
    console.log(encient)

    elements[0].scroll({
      top: 0, 
      left: encient, 
      behavior: 'smooth'
    });
    
   
    setTimeout(() => {
      this.scrollAuto()
    },  3000);
      
  }

}

