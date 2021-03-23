import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilFormationComponent } from './siteFormation/accueil-formation/accueil-formation.component';
import { CategorieDetailsFormationComponent } from './siteFormation/categorie-details-formation/categorie-details-formation.component';
import { FormationDetailsFormationComponent } from './siteFormation/formation-details-formation/formation-details-formation.component';
import { FormateurDetailsFormationComponent } from './siteFormation/formateur-details-formation/formateur-details-formation.component';

//pages categories
import { IdaretAmelComponent } from './siteFormation/pages-categories/idaret-amel/idaret-amel.component';
import { PnlComponent } from './siteFormation/pages-categories/pnl/pnl.component';


//admin
import { NewFormationComponent } from './adminFormation/new-formation/new-formation.component';
import { UpdateFormationComponent } from './adminFormation/update-formation/update-formation.component';

//compte
import { LoginEtudiantComponent } from './compte/login-etudiant/login-etudiant.component';
import { LoginEnseignantComponent } from './compte/login-enseignant/login-enseignant.component';
import { RegisterEtudiantComponent } from './compte/register-etudiant/register-etudiant.component';

const routes: Routes = [
  
  {path: '',redirectTo:'accueil',pathMatch:"full"},
  {path: 'accueil' , component: AccueilFormationComponent },

  {path: 'CategorieDetails' , component: CategorieDetailsFormationComponent },
  {path: 'FormationDetails' , component: FormationDetailsFormationComponent },
  {path: 'FormateurDetails' , component: FormateurDetailsFormationComponent },

  //pages categories
  {path: 'IdaretAmel' , component: IdaretAmelComponent },
  {path: 'Pnl' , component: PnlComponent },

  //
  {path: 'LoginEtudiant' , component: LoginEtudiantComponent },
  {path: 'LoginEnseignant' , component: LoginEnseignantComponent },
  {path: 'RegisterEtudiant' , component: RegisterEtudiantComponent },

  
  {path: 'NewFormation' , component: NewFormationComponent },
  {path: 'UpdateFormation' , component: UpdateFormationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
