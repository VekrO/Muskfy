import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './modules/components/player/player.component';
import { MusicListComponent } from './modules/components/music-list/music-list.component';
import { SearchComponent } from './modules/components/search/search.component';
import { SearchListComponent } from './modules/components/search-list/search-list.component';
import { MusicCardcomponent } from './modules/components/music-card/music-card.component';
import { LoginComponent } from './modules/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MusicListComponent,
    SearchComponent,
    SearchListComponent,
    MusicCardcomponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
