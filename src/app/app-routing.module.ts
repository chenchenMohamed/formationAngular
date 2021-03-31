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

const routes: Routes = [
  
  {path: '',redirectTo:'accueil',pathMatch:"full"},
  {path: 'accueil' , component: AccueilFormationComponent },

 
  {path: 'CategorieDetails' , component: CategorieDetailsFormationComponent },
  {path: 'FormationDetails' , component: FormationDetailsFormationComponent },
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


  { path: '**', component: AccueilFormationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
