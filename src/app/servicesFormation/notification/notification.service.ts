import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }


  showSuccess(message, title){
    //this.toastr.success(message, title, {positionClass: 'toast-top-center',})
    alert(message)
  }

  showError(message, title){
    //this.toastr.error(message, title, {positionClass: 'toast-top-center',})
   alert(message)
  }

  showMessageErrorBackEnd(nameError){
     for(let i = 0; i < this.messagesErrorsBackend.length; i++){
       if(nameError == this.messagesErrorsBackend[i].name){
         this.showError(this.messagesErrorsBackend[i].message, "Erreur")
       }
     }    
  }

  messagesErrorsBackend = [
    { name:"errorLogin", message: "Échec d’authentification"}, 
    { name:"errorRegister", message: "Votre email est déjà existe"},
    { name:"errorUpdateCompte1", message: 'Votre compte ne existe pas'},
    { name:"errorUpdateCompte2", message: "Votre nouveaux email existe déja"},
    { name:"errorUpdateCompte3", message: "Votre mot de passe non correspondante"}
  ]

  //erreurs compte
  errorPassword = "SVP, le mot de passe doit comporter au moins six caractères et peut être composé de lettres et de chiffres !!"
  errorPassowrdConfirm = "SVP, inserer votre confirmation de mot de passe !! "
  errorConfirmPassword = "SVP, verfier votre mot de passe !! "
  errorTelephone = "SVP, inserer votre telephone !! "
  errorEmail = "SVP, inserer votre email !! "
  errorNewEmail = "SVP, inserer votre nouveau email !! "
  errorNewPassword = "SVP, inserer votre nouveau mot de passe !! "
  errorValidationNewPassword = "SVP, validez votre nouveau mot de passe !! "
  errorValidationNewEmail = "SVP, validez votre nouveau email !! "
  errorNom = "SVP, inserer votre nom !! "
  errorMessage = "SVP, inserez votre message !! "
  errorAdresse = "SVP, inserez votre adresse !! "
  
  //erreurs Validation commande
  errorValidationPremierEtape = "SVP, Validez la première étape !!"
  errorPanierVide = "Désole, Votre panier est vide !!"

  //erreurs ajouter produit
  errorNomProduit = "SVP, inserer le nom !! "
  errorRefProduit = "SVP, inserer le ref !! "
  errorDisponibiliteProduit = "SVP, inserer le disponibilite !! "
  errorPrixAchatProduit = "SVP, inserer le prixAchat !! "
  errorPrixVenteProduit = "SVP, inserer le prixVente !! "
  errorDescriptionDessusProduit = "SVP, inserer le description !! "
  errorCategoriesProduit =  "SVP, inserer le categorie !! "
  errorMarqueProduit = "SVP, inserer le marque !! "
  errorCouleurProduit = "SVP, inserer le couleur !! "
  errorImagesProduit = "SVP, inserer les images !! "

  //success ajouter au panier
  successAjouterPanier = "Ce produit est ajouté au panier"
  successEnleverPanier = "Ce produit est enlevé de panier"
  
  alertNotConnexion = "Désole, ilya un problème de connexion internet"

  messageLogin= "Bienvenue "
  compteString= "Mon compte"

  TypeFelicitation = "Félicitations"
  TypeError = "Erreur"
  TypeMessage = "Message"

  successDownloadData = "Votre base de données est enregistré"
  successCompteActive = "Votre compte est maintenant activé"
  successUpdateCompte = "Votre modification est enregistrée"
  successCommandeEnvoyer = "Votre commande est envoyeé !!!"
  sucessProduitEnregistrer = "Votre produit est bien enregistrée"
  successContactEnvayer = "Votre contact est envoyé"
  messageYouConnecte = "Vous êtes connecté avec "
  messageFirstStepValide = "La premier etape est valide"
  successSaveUpdate = "Votre modification est enregistrée !!"

  //mot de passe oublie
  messageErrorPasswordForgien1 = "SVP, verifiez votre email"
  messageSuccessPasswordForgien2 = "L'email de modification est envoyé" 

  messageErrorForgotPassword = "SVP, répétez la procédure de mot de passe oublié"

  //produits speciales
  errorProduitSpecialUrl = "SVP, inserez URL de votre produit !! "
  errorProduitSpecialQuantite = "SVP, inserez la quantité de votre produit !! "
  errorProduitSpecialProduits = "SVP, inserez votres produits spéciales !! "
}

