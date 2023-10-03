import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MyApiService } from 'src/app/services/my-api.service';
import { User } from 'src/app/models/user';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  upperCheck: Boolean = false;
  lowerCheck: Boolean = false;
  numberCheck: Boolean = false;
  globPassword: String = '';
  passCheck: Boolean = false;
  user = new User();

  constructor(private formBuilder: FormBuilder, private apiservice: MyApiService, private http: HttpClient) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobNumber: ['', [Validators.required, Validators.pattern('^[6789]\\d{9}$')]],
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern, , this.customPasswordValidator]],
      confirmPassword: ['', Validators.required, this.matchPasswordValidator],
    });
  }
  register(data: any) {
    this.user.firstName = data.value.firstName;
    this.user.lastName = data.value.lastName;
    this.user.email = data.value.email;
    this.user.contactNo = data.value.mobNumber;
    this.user.userName = data.value.userName;
    this.user.password = data.value.password;
    debugger;
    this.apiservice.userRegister(this.user).subscribe({
      next(response) {
        alert('registration Successfull, Please Login to Continue')
        console.log(response);
      },
      error(error) {
        console.error('Error:', error);
      },
      complete() {
      }
    })
  }

  customPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    this.globPassword = value;
    const hasUppercase = /[A-Z]/.test(control.value);
    const hasLowercase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);

    console.log("hasUppercase", hasUppercase)
    console.log("hasLowercase", hasLowercase)
    console.log("hasNumber", hasNumber)

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
      console.log("inside block Special", /[A-Z]/.test(value))
      return { specialCharacterRequired: true };
    }
    if (!hasUppercase) {
      this.upperCheck = false;
    } else {
      console.log("setting UpperCase ")
      this.upperCheck = true;
    }
    if (!hasLowercase) {
      this.lowerCheck = false;
    } else {
      console.log("setting lowrcase ")
      this.lowerCheck = true;
    }
    if (!hasNumber) {
      this.numberCheck = false;
    } else {
      this.numberCheck = true;
    }
    if (!hasUppercase) {
      this.upperCheck = false;
      return { uppercaseRequired: true };
    } else {
      console.log("setting UpperCase ")
      this.upperCheck = true;
    }

    if (!hasLowercase) {
      this.lowerCheck = false;
      return { lowercaseRequired: true };
    } else {
      console.log("setting lowrcase ")
      this.lowerCheck = true;
    }
    if (!hasNumber) {
      this.numberCheck = false;
      return { numberRequired: true };
    } else {
      this.numberCheck = true;
    }
    return null;
  }

  matchPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
    const confirmPassword = control.value;
    const passwordValue = this.globPassword;
    if (passwordValue && confirmPassword && passwordValue !== confirmPassword) {
      this.passCheck = false;
      return { passwordMismatch: true };
    } else {
      this.passCheck = true;
    }
    return null;
  }
}
