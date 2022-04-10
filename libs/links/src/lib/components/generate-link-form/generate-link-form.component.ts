import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bit-clone-app-generate-link-form',
  templateUrl: './generate-link-form.component.html',
  styleUrls: ['./generate-link-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateLinkFormComponent implements OnInit {
  public generateLinkForm: FormGroup;
  @Output() submitEvent = new EventEmitter<string>();
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  get formControls() {
    return this.generateLinkForm.controls;
  }

  ngOnInit(): void {
    this.generateLinkForm = this.formBuilder.group({
      url: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.generateLinkForm.invalid) {
      return;
    }

    this.submitEvent.emit(this.formControls['url'].value);
  }
}
