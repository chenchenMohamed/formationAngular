import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilFormationComponent } from './siteFormation/accueil-formation/accueil-formation.component';
import { EtudiantDetailsFormationComponent } from './siteFormation/etudiant-details-formation/etudiant-details-formation.component';
import { CategorieDetailsFormationComponent } from './siteFormation/categorie-details-formation/categorie-details-formation.component';
import { FormationDetailsFormationComponent } from './siteFormation/formation-details-formation/formation-details-formation.component';
import { FormateurDetailsFormationComponent } from './siteFormation/formateur-details-formation/formateur-details-formation.component';

//pages categories
import { IdaretAmelComponent } from './siteFormation/pages-categories/idaret-amel/idaret-amel.component';
import { PnlComponent } from './siteFormation/pages-categories/pnl/pnl.component';


//admin

//compte
import { LoginFormationComponent } from './siteFormation/compteFormation/login-formation/login-formation.component';
import { InscriptionFormationComponent } from './siteFormation/compteFormation/inscription-formation/inscription-formation.component';

import { ListFormationEnseignantComponent } from './adminEnseignant/list-formation-enseignant/list-formation-enseignant.component';
import { ProfilEnseignantComponent } from './adminEnseignant/profil-enseignant/profil-enseignant.component';
import { ListEtudiantEnseignantComponent } from './adminEnseignant/list-etudiant-enseignant/list-etudiant-enseignant.component';
import { NewFormationComponent } from './adminEnseignant/new-formation/new-formation.component';
import { UpdateFormationComponent } from './adminEnseignant/update-formation/update-formation.component';
import { AddEtudiantEnseignantComponent } from './adminEnseignant/add-etudiant-enseignant/add-etudiant-enseignant.component';

//etudiant
import { ListFormationEtudiantComponent } from './adminEtudiant/list-formation-etudiant/list-formation-etudiant.component';
import { ProfilEtudiantComponent } from './adminEtudiant/profil-etudiant/profil-etudiant.component';

//admin
import { ListEnseignantsFormationComponent } from './adminFormation/list-enseignants-formation/list-enseignants-formation.component';
import { ListEtudiantsFormationComponent } from './adminFormation/list-etudiants-formation/list-etudiants-formation.component';
import { ListFormationsFormationComponent } from './adminFormation/list-formations-formation/list-formations-formation.component';
import { ProfilAdminComponent } from './adminFormation/profil-admin/profil-admin.component';

import { CategoriesPageComponent } from './siteFormation/categories-page/categories-page.component';
import { FormateursPageComponent } from './siteFormation/formateurs-page/formateurs-page.component';
import { FormationsPageComponent } from './siteFormation/formations-page/formations-page.component';
import { CenterFormationPageComponent } from './siteFormation/center-formation-page/center-formation-page.component';
import { ProposPageComponent } from './siteFormation/propos-page/propos-page.component';
import { ContactPageComponent } from './siteFormation/contact-page/contact-page.component';

const routes: Routes = [

  {path: 'CategoriesPage' , component: CategoriesPageComponent },
  {path: 'FormateursPage' , component: FormateursPageComponent },
  {path: 'FormationsPage' , component: FormationsPageComponent },
  {path: 'CenterFormationPage' , component: CenterFormationPageComponent },
  {path: 'ProposPage' , component: ProposPageComponent },
  {path: 'ContactPage' , component: ContactPageComponent },


  {path: '',redirectTo:'accueil',pathMatch:"full"},
  {path: 'accueil' , component: AccueilFormationComponent },

  {path: 'CategorieDetails' , component: CategorieDetailsFormationComponent },
  {path: 'FormationDetails/:id' , component: FormationDetailsFormationComponent },
  {path: 'FormateurDetails' , component: FormateurDetailsFormationComponent },
  {path: 'EtudiantDetails' , component: EtudiantDetailsFormationComponent },

  //pages categories
  {path: 'IdaretAmel' , component: IdaretAmelComponent },
  {path: 'Pnl' , component: PnlComponent },

  //
  {path: 'LoginFormation' , component: LoginFormationComponent },
  {path: 'InscriptionFormation' , component: InscriptionFormationComponent },

//enseignant  
  {path: 'NewFormation' , component: NewFormationComponent },
  {path: 'UpdateFormation' , component: UpdateFormationComponent },
  {path: 'ListFormationEnseignant' , component: ListFormationEnseignantComponent },
  {path: 'ListEtudiantEnseignant' , component: ListEtudiantEnseignantComponent },
  {path: 'ProfilEnseignant' , component: ProfilEnseignantComponent },
  {path: 'AddEtudiantEnseignant' , component: AddEtudiantEnseignantComponent },

  //etudiant
 {path: 'ListFormationEtudiant' , component: ListFormationEtudiantComponent },
 {path: 'ProfilEtudiant' , component: ProfilEtudiantComponent },

 //admin
 {path: 'ListEnseignantsFormation' , component: ListEnseignantsFormationComponent },
 {path: 'ListEtudiantsFormation' , component: ListEtudiantsFormationComponent },
 {path: 'ListFormationsFormation' , component: ListFormationsFormationComponent },
 {path: 'ProfilAdmin' , component: ProfilAdminComponent },

  { path: '**', component: AccueilFormationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
