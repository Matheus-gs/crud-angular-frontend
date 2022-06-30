import { Component, OnInit } from "@angular/core";

import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroupName,
} from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  user: any = FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialogRef<UserCreateComponent>
  ) {
    this.user = this.formBuilder.group({
      name: ["", Validators.required],
      bornDate: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  handleCreateUser(): void {
    const data: User = this.user.value;
    if (this.user.valid) {
      this.userService.create(data).subscribe(() => {
        this.userService.showMessage("Usuário cadastrado com sucesso!");
        this.dialog.close();
      });
    } else {
      this.userService.showMessage(
        "Verifique os dados e tente novamente!",
        true
      );
    }
  }

  closeCreateUserModal(): void {
    this.dialog.close();
  }
}
