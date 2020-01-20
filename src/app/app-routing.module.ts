import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/guards/admin.guard';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';




const routes: Routes = [

  {
    path: 'dummy',
    redirectTo: '/questionario',
    //loadChildren: () => import('./dummy/dummy.module').then(m => m.DummyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'questionario',
    loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
    canActivate: [AuthGuard] ,
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard,AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'not-found',
    component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found'
  }

  //academias
  //formularios
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
