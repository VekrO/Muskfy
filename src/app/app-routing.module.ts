import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListComponent } from './modules/components/music-list/music-list.component';
import { LoginComponent } from './modules/components/login/login.component';

const routes: Routes = [
  {
    path: '', component: MusicListComponent,
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
