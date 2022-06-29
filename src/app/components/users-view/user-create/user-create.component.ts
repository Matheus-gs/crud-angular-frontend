import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  user: any = FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      name: ["", Validators.required],
      bornDate: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  isAdult(): boolean {
    const currentYear = new Date().getFullYear();
    const userBornDateYear = new Date(this.user.value.bornDate).getFullYear();
    return currentYear - userBornDateYear >= 18;
  }

  handleCreateUser(): void {
    const data = this.user.value;
    
    if (this.user.valid && this.isAdult() == true) {
      this.userService.create(data).subscribe(() => {
        this.userService.showMessage("Usuário cadastrado com sucesso!");
        this.router.navigate(["users"]);
      });
    } else if (this.isAdult() == false) {
      this.userService.showMessage(
        "Só é permitido o cadastro de usuários maiores de 18 anos!",
        true
      );
    } else {
      this.userService.showMessage(
        "Verifique os dados e tente novamente!",
        true
      );
    }
  }

  handleCancelCreateUser(): void {
    this.router.navigate(["users"]);
  }
}
