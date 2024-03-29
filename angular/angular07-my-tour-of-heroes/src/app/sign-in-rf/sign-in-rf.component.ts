import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss'],
})
export class SignInRfComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: '',
      password: '',
      rememberMe: false,
    });

    setTimeout(() => {
      // fake api call then update form value
      this.signInForm.patchValue({
        username: 'TiepPhan',
      });
    }, 1000);
  }

  onSubmit(): void {
    console.log(this.signInForm);
  }
}
