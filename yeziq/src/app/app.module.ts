import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { LoginFormComponent } from './login-page/login-form/login-form.component';
import { RegisterFormComponent } from './login-page/register-form/register-form.component';

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
    ReadingSpaceComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
