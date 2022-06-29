import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.userData.id = params["id"];
    });

    this.user = this.formBuilder.group({
      name: ["", Validators.required],
      bornDate: ["", Validators.required],
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
        bornDate: [bornDate, Validators.required],
        email: [email, [Validators.required, Validators.email]],
        role: [role, Validators.required],
      });
    });
  }

  handleUpdateUser(): void {
    const data: User = this.user.value;
    if (
      this.user.valid &&
      this.userService.isAdult(this.user.value.bornDate) == true
    ) {
      this.userService.update(this.userData.id, data).subscribe(() => {
        this.userService.showMessage("Informações alteradas com sucesso!");
        this.router.navigate(["/users"]);
      });
    } else if (this.userService.isAdult(this.user.value.bornDate) == false) {
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

  handleCancelUpdateUser(): void {
    this.router.navigate(["/users"]);
  }
}
