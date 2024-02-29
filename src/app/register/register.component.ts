import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { OnboardingComponent } from '../layout/onboarding/onboarding.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    OnboardingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: [''],
      age: [''],
      email: [''],
      password: [''],
    });
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value);
  }
}
