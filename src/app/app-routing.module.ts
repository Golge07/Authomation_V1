import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadControlGuard } from './guards/load-control.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },{
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
   canActivate:[LoadControlGuard]
  },{
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate:[LoadControlGuard]
  },{
    path: 'index',
    loadChildren: () => import('./pages/shelfs/shelfs.module').then( m => m.ShelfsPageModule),
    canActivate:[LoadControlGuard]
      },{ 
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canActivate:[LoadControlGuard]
  },{
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[LoadControlGuard]
  },{
    path: 'adds',
    loadChildren: () => import('./pages/addpage/addpage.module').then(m => m.AddpagePageModule),
    canActivate:[LoadControlGuard]
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule,FormsModule]
})
export class AppRoutingModule { }
