import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  user: User = {
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
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }

  ngOnInit(): void {
    this.userService.readById(this.userId).subscribe((data) => {
      this.user = data;
      this.userCurrentName = data.name;
    });
  }

  handleUpdateUser(): void {
    this.userService.update(this.userId, this.user).subscribe(() => {
      this.userService.showMessage("Informações alteradas com sucesso!");
      this.router.navigate(["/users"]);
    });
  }

  handleCancelUpdateUser(): void {
    this.router.navigate(["/users"]);
  }

  handleDeleteUser(): void {
    this.userService.delete(this.userId).subscribe(() => {
      this.userService.showMessage("Usuário removido com sucesso!");
      this.router.navigate(["/users"]);
    });
  }

}
