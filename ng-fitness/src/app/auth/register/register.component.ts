import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onRegister(form: NgForm) {
    console.log(form);
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }
}
