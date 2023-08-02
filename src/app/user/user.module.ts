import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome/fontawesome.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // FontAwesomeModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { 
  constructor() {
    library.add(fas);
  }
}
