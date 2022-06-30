import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogData, User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { ageOverEighteen, ageValidator } from "src/app/validators/custom-validators";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  user: any;

  userData: User = {
    id: null,
    name: null,
    email: null,
    role: null,
    bornDate: null,
  };

  userId: number;
  userCurrentName: string;

  constructor(
    private userService: UserService,

    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.userData.id = this.data.id;

    this.user = this.formBuilder.group({
      name: ["", Validators.required],
      bornDate: ["", ageValidator()],
      // bornDate: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.readById(this.userData.id).subscribe((data) => {
      this.userData = data;

      const { name, bornDate, email, role } = this.userData;

      this.user = this.formBuilder.group({
        name: [name, Validators.required],
        bornDate: [bornDate, ageValidator()],
        // bornDate: [bornDate, Validators.required],
        email: [email, [Validators.required, Validators.email]],
        role: [role, Validators.required],
      });

      this.userCurrentName = name;
    });
  }

  handleUpdateUser(): void {
    const data: User = this.user.value;
    const birthDate = data.bornDate;

    if (this.user.valid && ageOverEighteen(birthDate)) {
      this.userService.update(this.userData.id, data).subscribe(() => {
        this.userService.showMessage("Informações alteradas com sucesso!");
        this.dialogRef.close();
      });
    } else if (!ageOverEighteen(birthDate)) {
      this.userService.showMessage(
        "Usuários com idade menor que 18 anos não são permitidos, verifique a data de nascimento e tente novamente",
        true
      );
    } else {
      this.userService.showMessage(
        "Verifique os dados e tente novamente!",
        true
      );
    }
  }

  closeUpdateUserModal(): void {
    this.dialogRef.close();
  }
}
