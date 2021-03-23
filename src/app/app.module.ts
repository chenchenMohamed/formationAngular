import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilFormationComponent } from './siteFormation/accueil-formation/accueil-formation.component';
import { LoginFormationComponent } from './siteFormation/compteFormation/login-formation/login-formation.component';
import { InscriptionFormationComponent } from './siteFormation/compteFormation/inscription-formation/inscription-formation.component';
import { ProfilEtudiantFormationComponent } from './siteFormation/compteFormation/profil-etudiant-formation/profil-etudiant-formation.component';
import { ProfilEnseignantFormationComponent } from './siteFormation/compteFormation/profil-enseignant-formation/profil-enseignant-formation.component';
import { NavbarSiteFormationComponent } from './shared/navbarsFormation/navbar-site-formation/navbar-site-formation.component';
import { FooterFormationComponent } from './shared/footer-formation/footer-formation.component';
import { ListEnseignantsFormationComponent } from './adminFormation/list-enseignants-formation/list-enseignants-formation.component';
import { ListEtudiantsFormationComponent } from './adminFormation/list-etudiants-formation/list-etudiants-formation.component';
import { Slider1Component } from './siteFormation/accueil-formation/components/slider1/slider1.component';
import { Slider2Component } from './siteFormation/accueil-formation/components/slider2/slider2.component';
import { Galerie3Component } from './siteFormation/accueil-formation/components/galerie3/galerie3.component';
import { Galerie4Component } from './siteFormation/accueil-formation/components/galerie4/galerie4.component';
import { Galerie5Component } from './siteFormation/accueil-formation/components/galerie5/galerie5.component';
import { TopCategoriesComponent } from './shared/categories/top-categories/top-categories.component';
import { CategorieDetailsFormationComponent } from './siteFormation/categorie-details-formation/categorie-details-formation.component';
import { FormationDetailsFormationComponent } from './siteFormation/formation-details-formation/formation-details-formation.component';
import { FormateurDetailsFormationComponent } from './siteFormation/formateur-details-formation/formateur-details-formation.component';
import { FomationsFormationComponent } from './shared/componentsFormation/fomations-formation/fomations-formation.component';
import { FormationsVoisinComponent } from './shared/componentsFormation/formations-voisin/formations-voisin.component';
import { IdaretAmelComponent } from './siteFormation/pages-categories/idaret-amel/idaret-amel.component';
import { PnlComponent } from './siteFormation/pages-categories/pnl/pnl.component';
import { FormationAccueilComponent } from './siteFormation/accueil-formation/components/formation-accueil/formation-accueil.component';
import { FormateursAccueilComponent } from './siteFormation/accueil-formation/components/formateurs-accueil/formateurs-accueil.component';
import { ListFormationsComponent } from './shared/formations/list-formations/list-formations.component';
import { ListFormateursComponent } from './shared/formateur/list-formateurs/list-formateurs.component';
import { LoginEtudiantComponent } from './compte/login-etudiant/login-etudiant.component';
import { LoginEnseignantComponent } from './compte/login-enseignant/login-enseignant.component';
import { RegisterEtudiantComponent } from './compte/register-etudiant/register-etudiant.component';
import { NewFormationComponent } from './adminFormation/new-formation/new-formation.component';
import { UpdateFormationComponent } from './adminFormation/update-formation/update-formation.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilFormationComponent,
    LoginFormationComponent,
    InscriptionFormationComponent,
    ProfilEtudiantFormationComponent,
    ProfilEnseignantFormationComponent,
    NavbarSiteFormationComponent,
    FooterFormationComponent,
    ListEnseignantsFormationComponent,
    ListEtudiantsFormationComponent,
    Slider1Component,
    Slider2Component,
    Galerie3Component,
    Galerie4Component,
    Galerie5Component,
    TopCategoriesComponent,
    CategorieDetailsFormationComponent,
    FormationDetailsFormationComponent,
    FormateurDetailsFormationComponent,
    FomationsFormationComponent,
    FormationsVoisinComponent,
    IdaretAmelComponent,
    PnlComponent,
    FormationAccueilComponent,
    FormateursAccueilComponent,
    ListFormationsComponent,
    ListFormateursComponent,
    LoginEtudiantComponent,
    LoginEnseignantComponent,
    RegisterEtudiantComponent,
    NewFormationComponent,
    UpdateFormationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
