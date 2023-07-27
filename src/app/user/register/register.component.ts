import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { matchPasswords } from 'src/app/shared/validators/match-passwords';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', Validators.required]
      },
      { validators: matchPasswords('password', 'rePassword') }
    )
  });

  register(): void {

    if(!this.form.valid) {
      return;
    }
  
    const {
      email,
      passGroup: { password, rePassword } = {}
    } = this.form.value
  
    this.userService.register(email!, password!, rePassword!).subscribe(() => {
  
    this.router.navigate(['/'])
    })
  }
}
