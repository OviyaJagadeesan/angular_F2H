import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Authentication } from 'src/Model/Authentication';
import { AuthenticationService } from 'src/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  islogginForm: boolean = false;
  isRegisterForm: boolean = true;
  isPasswordVisible: boolean = false;
  Email: string = '';
  Password: string = '';
  isCheckboxforTerm :boolean =false;
  isCheckboxforPolicy:boolean=false;

  userDetails: Authentication[] = [];
  authentication = new Authentication();

  public registerForm: FormGroup = new FormGroup({});
  errorMessage: string = '';


  public loginForm:FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthenticationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required,Validators.email]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      checkboxField: [false, Validators.requiredTrue],
    });

    this.loginForm = this.formBuilder.group({
      Email:['',Validators.required],
      Password:['', Validators.required]
    });
  }

  onClickRegister() {
    this.islogginForm = false;
    this.isRegisterForm = true;
  }
  onClickLogin() {
    this.islogginForm = true;
    this.isRegisterForm = false;
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  createUserAccount() {
    if (this.registerForm.valid) {
      this.api.addUsers(this.authentication).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    this.passwordMatch();
    this.checkboxValidation();
    console.log(this.registerForm.value);
  }

  authenticateUser(): void {

    console.log(this.Email);
    console.log(this.Password);
    this.api.validateUser(this.Email, this.Password).subscribe((response) => {
      if (response.length == 0) {
        console.log(response.value);
        console.log('Enter Valid Email and Password');
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  passwordMatch(){
    const Password = this.registerForm.get('Password');
    const ConfirmPassword = this.registerForm.get('ConfirmPassword');
    console.log(Password);
    if(Password!= ConfirmPassword){
      alert("Passwword do no match");
    }
    else if(this.isCheckboxforTerm == false && this.isCheckboxforPolicy == false){
      alert("Please check the checkbox to proceed");
    }

  }

  checkboxValidation(){
    this.isCheckboxforTerm = !this.isCheckboxforTerm
  }
  policyCheckbox(){
    this.isCheckboxforPolicy = !this.isCheckboxforPolicy;
  }
}
