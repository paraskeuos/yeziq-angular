import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { MainComponent } from './home-page/main/main.component';
import { CoursesComponent } from './home-page/main/courses/courses.component';
import { CoursesMenuComponent } from './home-page/main/courses/courses-menu/courses-menu.component';
import { AddCoursesComponent } from './home-page/main/courses/add-courses/add-courses.component';
import { ReadingSpaceComponent } from './home-page/main/reading-space/reading-space.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    NavbarComponent,
    MainComponent,
    CoursesComponent,
    CoursesMenuComponent,
    AddCoursesComponent,
    ReadingSpaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
