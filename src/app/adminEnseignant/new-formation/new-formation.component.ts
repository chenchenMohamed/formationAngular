import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoriesFormationService } from '../../servicesFormation/categoriesFormation/categories-formation.service';
import { UserService } from '../../servicesFormation/user/user.service';
import { NotificationService } from '../../servicesFormation/notification/notification.service'
import { ProduitsFormationService } from '../../servicesFormation/produitsFormation/produits-formation.service'



@Component({
  selector: 'app-new-formation',
  templateUrl: './new-formation.component.html',
  styleUrls: ['./new-formation.component.scss']
})
export class NewFormationComponent implements OnInit {

  formC:FormGroup

  fileSources = []

  categories = []

  caracteristiques = []

  listCategoriesShema=[]
  listCategories=[]
  listDescriptionsDessous=[]
  listDescriptionsDessus=[]
  
  constructor( private notificationService:NotificationService, private http: HttpClient, private categoriesServices: CategoriesFormationService, private userService:UserService, private productService:ProduitsFormationService) { 
    
    this.formC = new FormGroup({
      nom:new FormControl('',[Validators.required, Validators.min(1)]),
      prixVente:new FormControl(0,[Validators.required, Validators.min(1)]),
      description:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionTitle:new FormControl('',[Validators.required, Validators.min(1)]),
      descriptionValue:new FormControl('',[Validators.required, Validators.min(1)]),
      prixPromo:new FormControl(0,[Validators.required, Validators.min(1)]),
      file: new FormControl('', [Validators.required]),
      fileBlockImg: new FormControl('', [Validators.required]),
      descriptionBlockImg:new FormControl('',[Validators.required, Validators.min(1)]),
      images: new FormControl('', [Validators.required]),
    })

    this.categoriesServices.categories.subscribe(res =>{
      if(res.length > 0){
        this.insialiseCategories(res)     
      }
    })

  }

  insialiseCategories(encienCategories){
    let newCategories = []
    for(let i = 0; i < encienCategories.length; i++){
      let itemsSousCategories = []
      for(let j = 0; j < encienCategories[i].categories.length; j++){
        let itemsSousSousCategories = []
        for(let k = 0; k < encienCategories[i].categories[j].categories.length; k++){
          itemsSousSousCategories.push({id:encienCategories[i].categories[j].categories[k].id, isActive:false})
        }  
        itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:false, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
      }  
      newCategories.push({id:encienCategories[i].id, isActive:false, className:"div-sous-categories", categories:itemsSousCategories})
    }
    
    this.categories = newCategories
  }

  get f(){
    return this.formC.controls;
  }

  ngOnInit(): void {
  }

  selectCategorie(event){
    this.caracteristiques = []
    this.listCategoriesShema = []
    
    let encienCategories = this.categoriesServices.varCategories

    let newCategories = []
    for(let i = 0; i < encienCategories.length; i++){
      let itemsSousCategories = []
      for(let j = 0; j < encienCategories[i].categories.length; j++){
        let itemsSousSousCategories = []
        for(let k = 0; k < encienCategories[i].categories[j].categories.length; k++){
          itemsSousSousCategories.push({id:encienCategories[i].categories[j].categories[k].id, isActive:false})
        }  
        itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:false, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
      }  
      
      if(event.target.value == encienCategories[i].id){
        newCategories.push({id:encienCategories[i].id, isActive:true, className:"div-sous-categories", categories:itemsSousCategories})
        this.listCategoriesShema.push({categorie:encienCategories[i].id})
      }else{
        newCategories.push({id:encienCategories[i].id, isActive:false, className:"div-sous-categories", categories:itemsSousCategories})
      }
    }
    
    this.categories = newCategories
  }

  selectSousCategorie(event){
    this.caracteristiques = []
    this.listCategoriesShema = []
    let encienCategories = this.categoriesServices.varCategories

    let newCategories = []
    for(let i = 0; i < encienCategories.length; i++){
      let itemsSousCategories = []
      let okCategorie = false
      for(let j = 0; j < encienCategories[i].categories.length; j++){
        let itemsSousSousCategories = []
        
        for(let k = 0; k < encienCategories[i].categories[j].categories.length; k++){
          itemsSousSousCategories.push({id:encienCategories[i].categories[j].categories[k].id, isActive:false})
        }  
        
        if(event.target.value == encienCategories[i].categories[j].id){
          this.caracteristiques = encienCategories[i].categories[j].caracteristiques
          okCategorie = true
          itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:true, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
          this.listCategoriesShema.push({categorie:encienCategories[i].categories[j].id})
        }else{
          itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:false, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
        }
      
      }  
      
      if(okCategorie){
         newCategories.push({id:encienCategories[i].id, isActive:true, className:"div-sous-categories", categories:itemsSousCategories})
         this.listCategoriesShema.push({categorie:encienCategories[i].id})
        }else{
        newCategories.push({id:encienCategories[i].id, isActive:false, className:"div-sous-categories", categories:itemsSousCategories})
      }
    }
    
    this.categories = newCategories
  }

  isSpecialsProduct = false
  isNewProduct = false
  isMeilleurVenteProduct = false
  
  selectOptionProduct(event){
    
    if(event.target.title == "Specials"){
      this.isSpecialsProduct = event.target.value == "1" 
      if(this.isSpecialsProduct){
        this.listCategories.push({categorie:this.productService.produitSpecialsString})
      }else{
        this.listCategories = this.listCategories.filter(x => x.categorie != this.productService.produitSpecialsString)
      }
    }else if(event.target.title == "Nouveau"){
      this.isNewProduct  = event.target.value == "1"
      if(this.isNewProduct){
        this.listCategories.push({categorie:this.productService.produitNouveauString})
      }else{
        this.listCategories = this.listCategories.filter(x => x.categorie != this.productService.produitNouveauString)
      }
    }else if(event.target.title == "Meilleur-Vente"){
      this.isMeilleurVenteProduct  = event.target.value == "1"
      if(this.isMeilleurVenteProduct){
        this.listCategories.push({categorie:this.productService.produitMeilleurVenteString})
      }else{
        this.listCategories = this.listCategories.filter(x => x.categorie != this.productService.produitMeilleurVenteString)
      }
    }

  }

  ajouterCategorie(categorie){
 
    let item = this.listCategories.filter(x => x.categorie == categorie)
    if(item.length == 0){
      this.listCategories.push({categorie:categorie})
    }
  
  }
  
  removeCategorie(event){
    this.listCategories = this.listCategories.filter(x => x.categorie != event.target.value)
  
    if(event.target.value == this.productService.produitSpecialsString){
      this.isSpecialsProduct = false
    }else if(event.target.value == this.productService.produitNouveauString){
      this.isNewProduct  = false
    }else if(event.target.value == this.productService.produitMeilleurVenteString){
      this.isMeilleurVenteProduct  = false
    }
  }

 
  selectSousSousCategorie(event){
    
    this.caracteristiques = []
    this.listCategoriesShema = []
    let encienCategories = this.categoriesServices.varCategories

    let newCategories = []
    for(let i = 0; i < encienCategories.length; i++){
      let itemsSousCategories = []
      let okCategorie = false
      for(let j = 0; j < encienCategories[i].categories.length; j++){
        let itemsSousSousCategories = []
        let okSousCategorie = false
        for(let k = 0; k < encienCategories[i].categories[j].categories.length; k++){
          if(event.target.value == encienCategories[i].categories[j].categories[k].id){
            this.caracteristiques = encienCategories[i].categories[j].categories[k].caracteristiques
            okSousCategorie = true 
            itemsSousSousCategories.push({id:encienCategories[i].categories[j].categories[k].id, isActive:true})
            this.listCategoriesShema.push({categorie:encienCategories[i].categories[j].categories[k].id})
          }else{
            itemsSousSousCategories.push({id:encienCategories[i].categories[j].categories[k].id, isActive:false})
          }
        }  
        
        if(okSousCategorie){
          okCategorie = true
          itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:true, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
          this.listCategoriesShema.push({categorie:encienCategories[i].categories[j].id})
        }else{
          itemsSousCategories.push({id:encienCategories[i].categories[j].id, isActive:false, className:"div-sous-sous-categories", categories:itemsSousSousCategories})
        }
      
      }  
      
      if(okCategorie){
        newCategories.push({id:encienCategories[i].id, isActive:true, className:"div-sous-categories", categories:itemsSousCategories})
        this.listCategoriesShema.push({categorie:encienCategories[i].id})
      }else{
        newCategories.push({id:encienCategories[i].id, isActive:false, className:"div-sous-categories", categories:itemsSousCategories})
      }
    }
    
    this.categories = newCategories
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
  images = []
  multiImage
  imageSelected
  imageSelectedSource

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

  onFileDelete(id) {
    
    this.images = this.images.filter(x => x.ordeur != id)

    this.formC.patchValue({
      images: this.fileSources
    });

    this.formC.patchValue({
      file: ""
    });
  }

  ajouterImage() {
    if(this.imageSelectedSource == {} || this.imageSelected == ""){
      return
    }
   
    this.images.push({imageSource:this.imageSelectedSource, image:this.imageSelected, ordeur:this.images.length})
  
    this.initialiseImage()
  }

  idImage = -1
  selectedImage(id) {
    this.initialiseImage()

    let images = this.images.filter(x => x.ordeur == id)

    if(images.length > 0 ){
      this.idImage = images[0].ordeur
      this.imageSelectedSource = images[0].imageSource
      this.imageSelected = images[0].image
    }
  }

  updateImage() {
    
    for(let i = 0; i < this.images.length; i++){
      if(this.images[i].ordeur == this.idImage){
        this.images[i].imageSource = this.imageSelectedSource
        this.images[i].image = this.imageSelected
      }
    }
    
    this.initialiseImage()
  }

  initialiseImage(){

    this.idImage = -1
    this.imageSelectedSource = {}
    this.imageSelected = ""

    this.formC.patchValue({
      file: ""
    });
  }

  // Gestion des photos --fin--

  // Gestion des BlockImages --debut--

  multiImageBlockImg
  imageBlockImg
  fileSourceBocksImg
  selectedMBlockImg(event) {
     this.multiImageBlockImg = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.fileSourceBocksImg = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imageBlockImg = reader.result; 
     }

  }

  blockImgs = []
  idBlockImg = -1

  ajouterBlock(){
    if(!this.imageBlockImg && !this.fileSourceBocksImg){
      return  
    }else if(this.formC.value.descriptionBlockImg == ""){
      return     
    }
   
    this.blockImgs.push({id:this.blockImgs.length, imageSource:this.fileSourceBocksImg, image:this.imageBlockImg, description:this.formC.value.descriptionBlockImg})
    this.initialiserBlock()
  }

  removeBlock(id){
    this.blockImgs = this.blockImgs.filter(x => x.id != id)
    this.initialiserBlock()
  }

  selectBlock(id){
    this.idBlockImg = id
    console.log(this.idBlockImg)
    let blockImgs = this.blockImgs.filter(x => x.id == id)
    if(blockImgs.length > 0){
      this.fileSourceBocksImg = blockImgs[0].imageSource
      this.imageBlockImg = blockImgs[0].image
      this.formC.patchValue({descriptionBlockImg: blockImgs[0].description});
    }
  }

  updateBlock(){
    if(this.idBlockImg == -1){
      return
    }

    for(let i = 0; i < this.blockImgs.length; i++){
      if(this.blockImgs[i].id == this.idBlockImg){
          this.blockImgs[i].imageSource = this.fileSourceBocksImg 
          this.blockImgs[i].image = this.imageBlockImg
          this.blockImgs[i].description = this.formC.value.descriptionBlockImg 
      }
    }

    this.initialiserBlock()
  }

  initialiserBlock(){
    this.idBlockImg = -1
    this.formC.patchValue({descriptionBlockImg: ""});
    this.formC.patchValue({fileBlockImg: ""});
    this.fileSourceBocksImg = ""
    this.imageBlockImg = ""
  }

  // Gestion des BlockImages --fin--

  
  isLoading = false;
  erreurString = []
  isErreurs = false;

  chargerErreurs(){
    this.erreurString = []
    this.isErreurs = false
  
    if(this.formC.controls.nom.status != "VALID") this.erreurString.push(this.notificationService.errorNomProduit)  
    if(this.formC.controls.ref.status != "VALID") this.erreurString.push(this.notificationService.errorRefProduit)
    if(this.formC.controls.disponibilite.status != "VALID") this.erreurString.push(this.notificationService.errorDisponibiliteProduit)
    if(this.formC.controls.prixAchat.status != "VALID") this.erreurString.push(this.notificationService.errorPrixAchatProduit)
    if(this.formC.controls.prixVente.status != "VALID") this.erreurString.push(this.notificationService.errorPrixVenteProduit)
    if(this.listCategories.length == 0) this.erreurString.push(this.notificationService.errorCategoriesProduit)
    if(this.formC.value.marque == "") this.erreurString.push(this.notificationService.errorMarqueProduit)
    if(this.formC.value.couleur == "") this.erreurString.push(this.notificationService.errorCouleurProduit)
    if(this.images.length == 0) this.erreurString.push(this.notificationService.errorImagesProduit)

    if(this.erreurString.length > 0){
      this.isErreurs = true 
      return true
    }
    return false
  }

  addProduit(){
    
    if(this.isLoading){
      return 
    }

    if (this.chargerErreurs()) {
      return
    }
  
    this.isLoading = true;

    let request =  this.formC.value
  
    var newImages = []
    var newBlocks = []

    var allImages = []

    for(let i = 0; i < this.images.length; i++){
      allImages.push({image:this.images[i].imageSource})
    }

    for(let i = 0; i < this.blockImgs.length; i++){
      allImages.push({image:this.blockImgs[i].imageSource})
    }

    if(allImages.length > 0){
 
      const formData = new FormData();
      this.isLoading = true
      for (let img of allImages){
        formData.append('myFiles', img.image)
      }
      
      this.http.post(this.userService.baseURL+"/produit/upload", formData).subscribe(
        res => {
          
          var arrayImages: any = res
          
          if(arrayImages.length > 0){
            for(let k=0; k < this.images.length; k++){
              newImages.push({image:arrayImages[k], ordeur : k})
            }

            let i = 0;
            for(let k=this.images.length; k < arrayImages.length; k++){
              newBlocks.push({image:arrayImages[k], description : this.blockImgs[i].description})
              i++
            }

            this.envoyerRequest(request, newImages, newBlocks)
          }else{
            alert(this.notificationService.alertNotConnexion)
            this.isLoading = false;
            return 
          }

        }, err => {
          alert(this.notificationService.alertNotConnexion)
          this.isLoading = false;
          return 
        }
      );

    }

  }

  envoyerRequest(request, newImages, newBlocks){
    
    request = this.getRequest(request, newImages, newBlocks)

    if(request.prixPromo != 0){
      if(request.categories.filter(x => x.categorie == this.productService.produitPromoString).length == 0){
         request.categories.push({categorie: this.productService.produitPromoString})
      }
    }else{
      request.categories = request.categories.filter(x => x.categorie != this.productService.produitPromoString)
    }

    this.http.post(this.userService.baseURL+"/produit/newProduit", request, 
    {
      headers: {
          "authorization": 'Bearer '+localStorage.getItem(this.userService.tokenString)
      }
    }).subscribe(
      res => {
        this.notificationService.showSuccess(this.notificationService.sucessProduitEnregistrer, "Message")
        this.formC.patchValue({nom: ""});
        //this.formC.body.reset()
        this.images = []
        this.fileSources = []
        this.isLoading = false; 
      }, err => {
        alert(this.notificationService.alertNotConnexion)
        console.log(err)
        this.isLoading = false; 
      }
    );
    
  }

  
  getRequest(request, newImages, newBlocks){
    delete(request["file"])
    delete(request["description"])
    delete(request["descriptionTitle"])
    delete(request["descriptionValue"])
    delete(request["fileBlockImg"])
    delete(request["descriptionBlockImg"])
    
    let newlistDescriptionsDessous = []
    for(let i = 0; i < this.listDescriptionsDessous.length; i++){
      newlistDescriptionsDessous.push({title: this.listDescriptionsDessous[i].title, value:this.listDescriptionsDessous[i].value})
    }

    let newlistDescriptionsDessus = []
    for(let i = 0; i < this.listDescriptionsDessus.length; i++){
      newlistDescriptionsDessus.push({ligne:this.listDescriptionsDessus[i].ligne})
    }


    request["images"] = newImages
    request["imgBlocks"] = newBlocks
    request["categories"] = this.listCategories
    request["descriptionsDessous"] = newlistDescriptionsDessous 
    request["descriptionsDessus"] = newlistDescriptionsDessus

    return request
  }

}
