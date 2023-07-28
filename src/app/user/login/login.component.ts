import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  login(): void {

    if(this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    console.log(email, password)

    this.userService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

}
