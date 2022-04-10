import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AuthFormData {
  username: string;
  password: string;
}

export enum BtnLabel {
  Register = 'Register',
  Login = 'Login',
}

@Component({
  selector: 'bit-clone-app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input() public loading = false;
  @Input() public error = '';
  @Input() public btnLabel: BtnLabel = BtnLabel.Login;

  public authForm: FormGroup;
  public submitted = false;

  @Output() formSubmit = new EventEmitter<AuthFormData>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }

    this.formSubmit.emit({
      username: this.formControls['username'].value,
      password: this.formControls['password'].value,
    });
  }
}
