import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoriesFormationService } from '../../servicesFormation/categoriesFormation/categories-formation.service'
import { UserService } from '../../servicesFormation/user/user.service'
import { ProduitsFormationService } from '../../servicesFormation/produitsFormation/produits-formation.service'
import { NotificationService } from '../../servicesFormation/notification/notification.service'

import { DomSanitizer } from "@angular/platform-browser";

import { Router, Event } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

   
@Component({
  selector: 'app-delete-formation',
  templateUrl: './delete-formation.component.html',
  styleUrls: ['./delete-formation.component.scss']
})
export class DeleteFormationComponent implements OnInit {

 
  formC:FormGroup

  fileSources = []

  categories = []


  listCategoriesShema=[]
  listCategories=[]
  listDescriptionsDessous=[]
  listDescriptionsDessus=[]
  
  longDesc

  
  constructor( private _Activatedroute:ActivatedRoute,  private router:Router, private domSanitizer:DomSanitizer, private notificationService:NotificationService, private http: HttpClient, private categoriesServices: CategoriesFormationService, public userService:UserService, public productService:ProduitsFormationService) { 
    
    this.formC = new FormGroup({
      nom:new FormControl('',[Validators.required, Validators.min(1)]),
      fournisseur:new FormControl('',[Validators.required, Validators.min(1)]),
      ref:new FormControl('',[Validators.required, Validators.min(1)]),
      disponibilite:new FormControl('',[Validators.required, Validators.min(1)]),
      prixAchat:new FormControl(0,[Validators.required, Validators.min(1)]),
      prixVente:new FormControl(0,[Validators.required, Validators.min(1)]),
      description:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionTitle:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionValue:new FormControl('',[Validators.required, Validators.min(1)]),
      prixPromo:new FormControl(0,[Validators.required, Validators.min(1)]),
      quantite:new FormControl(0,[Validators.required, Validators.min(1)]),
      file: new FormControl('', [Validators.required]),
      
      fileVideo: new FormControl('', [Validators.required]),
      videoYoutube: new FormControl('', [Validators.required]),
      coursPdf: new FormControl('', [Validators.required]),
      descriptionChapitre:new FormControl('',[Validators.required, Validators.min(1)]),
      titreChapitre:new FormControl('',[Validators.required, Validators.min(1)]),
      modeRessource:new FormControl('',[Validators.required, Validators.min(1)]),
     
      reference:new FormControl('',[Validators.required, Validators.min(1)]),
    })

    this.categoriesServices.categories.subscribe(res =>{
      if(res.length > 0){
        this.insialiseCategories(res)    
      }
    })


  }


  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.inisialiserProduit(params.get('id')); 
    });
  }
  
  isLoading = false

  formation
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
          this.initialiserFormation(this.formation)
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

  initialiserFormation(formation){
    this.formC = new FormGroup({
      nom:new FormControl(formation.nom,[Validators.required, Validators.min(1)]),
      fournisseur:new FormControl(formation.fournisseur,[Validators.required, Validators.min(1)]),
      ref:new FormControl(formation.ref,[Validators.required, Validators.min(1)]),
      disponibilite:new FormControl(formation.disponibilite,[Validators.required, Validators.min(1)]),
      prixVente:new FormControl(formation.prixVente,[Validators.required, Validators.min(1)]),
      description:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionTitle:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionValue:new FormControl('',[Validators.required, Validators.min(1)]),
      prixPromo:new FormControl(formation.prixPromo,[Validators.required, Validators.min(1)]),
      quantite:new FormControl(formation.quantite,[Validators.required, Validators.min(1)]),
      dateFinPromo:new FormControl('',[Validators.required, Validators.min(1)]),
      file: new FormControl('', [Validators.required]),
      
      fileVideo: new FormControl('', [Validators.required]),
      videoYoutube: new FormControl('', [Validators.required]),
      coursPdf: new FormControl('', [Validators.required]),
      descriptionChapitre:new FormControl('',[Validators.required, Validators.min(1)]),
      titreChapitre:new FormControl('',[Validators.required, Validators.min(1)]),
      modeRessource:new FormControl('',[Validators.required, Validators.min(1)]),
     
      reference:new FormControl(formation.reference,[Validators.required, Validators.min(1)]),
    })

    for(let i = 0; i < formation.categories.length;i++){
      this.listCategories.push({categorie:formation.categories[i].categorie})    
    }

    for(let i = 0; i < formation.descriptionsDessous.length;i++){
      this.listDescriptionsDessous.push({id:i,title:formation.descriptionsDessous[i].title, value:formation.descriptionsDessous[i].value})    
    }
    
    for(let i = 0; i < formation.descriptionsDessus.length;i++){
      this.listDescriptionsDessus.push({id:i,ligne:formation.descriptionsDessus[i].ligne})    
    }
    
    this.imageSelected = formation.imagePrincipale
    this.imageSelectedSource = null

    for(let i = 0; i < formation.chapitres.length; i++){
      this.counterChapitre++
    
      this.chapitres.push({
         id:this.counterChapitre,
         videoYoutube:"", 
         titreChapitre:formation.chapitres[i].titre, 
         descriptionChapitre:formation.chapitres[i].description,
         fileVideo:formation.chapitres[i].video,
         fileSourceVideo:"",
         fileCoursPdf:formation.chapitres[i].coursPdf,
         fileSourceCoursPdf:""
      })
    }

  }

  photoURL(url) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  isOnLine=1
  setOnline(pos){
    this.isOnLine = pos
  }

  
 videoexemple = "https://www.youtube.com/embed/AsNeE_95QBA"

  insialiseCategories(encienCategories){
 
    let newCategories = []
    for(let i = 0; i < encienCategories.length; i++){
      newCategories.push({id:encienCategories[i].titre, className:"div-sous-categories", categories:[]})
    }
    
    this.categories = newCategories
  }

  get f(){
    return this.formC.controls;
  }

  
  selectCategories2(id){
  
    if(this.listCategories.filter(x => x.categorie == id).length > 0){
      this.listCategories = this.listCategories.filter(x => x.categorie != id)
    }else{
      this.listCategories.push({categorie : id})
    }

  }

  verifierCategories2(categorie){
    if(this.listCategories.filter(x => x.categorie == categorie).length > 0){
      return true
    }
    return false
  }
  
  
    
  // Gestion des DescriptionDessus --debut--
  descriptionDessusSelected = {id:-1, ligne:""}

  ajouteDescriptionDessus(){
    if(this.formC.value.description != ""){
      this.listDescriptionsDessus.push({ligne:this.formC.value.description, id:this.listDescriptionsDessus.length})
      this.intialiseDescriptionDessus()
    }
  }

  removeDescriptionDessus(id){
    this.listDescriptionsDessus = this.listDescriptionsDessus.filter(x => x.id != id)
    this.intialiseDescriptionDessus()
  }

  selectedDescriptionDessus(id){
    let item = this.listDescriptionsDessus.filter(x => x.id == id)
    if(item.length > 0){
      this.descriptionDessusSelected = item[0]
      this.formC.patchValue({description: this.descriptionDessusSelected.ligne});
    }
  }

  modifieDescriptionDessus(){
    for(let i = 0; i < this.listDescriptionsDessus.length; i++){
      if(this.listDescriptionsDessus[i].id == this.descriptionDessusSelected.id){
        this.listDescriptionsDessus[i].ligne = this.formC.value.description
      }
    }
    this.intialiseDescriptionDessus()
  }

  intialiseDescriptionDessus(){
    this.formC.patchValue({description: ""});
    this.descriptionDessusSelected = {id:-1, ligne:""}
  }

  // Gestion des DescriptionDessus --fin--

  // Gestion des DescriptionDessous --debut--

  descriptionDessousSelected = {id:-1, title:"", value:""}

  ajouteDescriptionDessous(){
    if(this.formC.value.descriptionTitle != "" || this.formC.value.descriptionValue != ""){
      this.listDescriptionsDessous.push({title:this.formC.value.descriptionTitle,value:this.formC.value.descriptionValue,id:this.listDescriptionsDessous.length})
      this.intialiseDescriptionDessous()
    }
  }

  removeDescriptionDessous(id){
    this.listDescriptionsDessous = this.listDescriptionsDessous.filter(x => x.id != id)
    this.intialiseDescriptionDessous()
  }
  
  selectedDescriptionDessous(id){
    let item = this.listDescriptionsDessous.filter(x => x.id == id)
    if(item.length > 0){
      this.descriptionDessousSelected = item[0]
      this.formC.patchValue({descriptionTitle: this.descriptionDessousSelected.title});
      this.formC.patchValue({descriptionValue: this.descriptionDessousSelected.value});
    }
  }

  modifieDescriptionDessous(){
    for(let i = 0; i < this.listDescriptionsDessous.length; i++){
      if(this.listDescriptionsDessous[i].id == this.descriptionDessousSelected.id){
        this.listDescriptionsDessous[i].title = this.formC.value.descriptionTitle
        this.listDescriptionsDessous[i].value = this.formC.value.descriptionValue
      }
    }
    this.intialiseDescriptionDessous()
  }

  intialiseDescriptionDessous(){
    this.formC.patchValue({descriptionTitle: ""});
    this.formC.patchValue({descriptionValue: ""});
    this.descriptionDessousSelected = {id:-1, title:"", value:""}
  }


  // Gestion des DescriptionDessus --fin--

  // Gestion des photos --debut--
  multiImage
  imageSelected = null
  imageSelectedSource = ""

  selectedM(event) {
     this.multiImage = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.imageSelectedSource = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imageSelected = reader.result
     }
  }


  // Gestion des photos --fin--

  // Gestion des Chapitres --debut--

  multiImageBlockImg
  fileCoursPdf
  fileSourceCoursPdf
  selectedCoursPdf(event) {
     this.multiImageBlockImg = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.fileSourceCoursPdf = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.fileCoursPdf = reader.result; 
     }

  }


  fileVideo
  fileSourceVideo
  selectedFileVideo(event) {
     this.multiImageBlockImg = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.fileSourceVideo = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.fileVideo = reader.result; 
     }

  }


  chapitres = []
  idChapitre = -1
  chapitre = {id:-1, videoYoutube:"", titreChapitre:"", descriptionChapitre:"",  fileVideo:"", fileSourceVideo:"", fileCoursPdf:"", fileSourceCoursPdf:""}
  counterChapitre = 0
  
  ajouterChapitre(){
    if(!this.fileCoursPdf && !this.fileSourceCoursPdf){
      return  
    }else if(this.formC.value.titreChapitre == ""){
      return     
    }
    this.counterChapitre++
    
    this.chapitres.push({
       id:this.counterChapitre,
       videoYoutube:this.formC.value.videoYoutube, 
       titreChapitre:this.formC.value.titreChapitre, 
       descriptionChapitre:this.formC.value.descriptionChapitre,
       fileVideo:this.fileVideo,
       fileSourceVideo:this.fileSourceVideo,
       fileCoursPdf:this.fileCoursPdf,
       fileSourceCoursPdf:this.fileSourceCoursPdf
    })

    this.initialiserChapitre()
  }

  removeChapitre(id){
    this.chapitres = this.chapitres.filter(x => x.id != id)
    this.initialiserChapitre()
  }

  selectChapitre(id){
    let blockImgs = this.chapitres.filter(x => x.id == id)
    if(blockImgs.length > 0){
      this.chapitre = blockImgs[0]
      this.fileSourceCoursPdf = blockImgs[0].fileSourceCoursPdf
      this.fileSourceVideo = blockImgs[0].fileSourceVideo
      this.fileCoursPdf = blockImgs[0].fileCoursPdf
      this.fileVideo = blockImgs[0].fileVideo
      

      this.formC.patchValue({
        descriptionChapitre: blockImgs[0].descriptionChapitre,
        titreChapitre: blockImgs[0].titreChapitre,
        videoYoutube: blockImgs[0].videoYoutube
      });
    }
  }

  updateChapitre(){
    if(this.chapitre.id == -1){
      return
    }

    for(let i = 0; i < this.chapitres.length; i++){
      if(this.chapitres[i].id == this.chapitre.id){
        this.chapitres[i].videoYoutube=this.formC.value.videoYoutube, 
        this.chapitres[i].titreChapitre=this.formC.value.titreChapitre, 
        this.chapitres[i].descriptionChapitre=this.formC.value.descriptionChapitre,
        this.chapitres[i].fileVideo=this.fileVideo,
        this.chapitres[i].fileSourceVideo=this.fileSourceVideo,
        this.chapitres[i].fileCoursPdf=this.fileCoursPdf,
        this.chapitres[i].fileSourceCoursPdf=this.fileSourceCoursPdf
      
      }
    }

    this.initialiserChapitre()
  }

  initialiserChapitre(){
    
    this.fileSourceCoursPdf = ""
    this.fileSourceVideo = ""
    this.fileCoursPdf = ""
    this.fileVideo = ""
    

    this.formC.patchValue({
      descriptionChapitre: "",
      titreChapitre: "",
      videoYoutube: "",
      fileVideo:"",
      coursPdf:""
    }); 
    this.chapitre = {id:-1, videoYoutube:"", titreChapitre:"", descriptionChapitre:"",  fileVideo:"", fileSourceVideo:"", fileCoursPdf:"", fileSourceCoursPdf:""}
   
    console.log(this.chapitres)
  }

  // Gestion des Chapitre --fin--

  
  erreurString = []
  isErreurs = false;


  isDelete = false
  envoyerRequest(){
    
    if(this.isLoading){
      return
    }

    this.isLoading = true
    
    this.http.get(this.userService.baseURL+"/produit/deleteFormation/"+this.formation.id,
    {
      headers: {
          "authorization": 'Bearer '+localStorage.getItem(this.userService.tokenString)
      }
    }).subscribe(
      res => {
        this.notificationService.showSuccess(this.notificationService.successSaveUpdate, "Message")
         this.isLoading = false; 
         this.isDelete = true
      }, err => {
        alert(this.notificationService.alertNotConnexion)
        console.log(err)
        this.isLoading = false; 
      }
    );
    
  }


}