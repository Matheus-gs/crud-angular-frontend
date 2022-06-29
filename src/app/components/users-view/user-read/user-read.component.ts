import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-read",
  templateUrl: "./user-read.component.html",
  styleUrls: ["./user-read.component.css"],
})
export class UserReadComponent implements OnInit {
  users: User[];
  displayedColumns = ["name", "email", "role", "bornDate", "actions"];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.read().subscribe((userData) => {
      this.users = userData;
    });
  }

  handleUpdateUser(id: number): void {
    this.router.navigate([`users/update/${id}`]);
  }
  
  handleDeleteUser(id: number): void {
      this.userService.delete(id).subscribe(() => {
        this.userService.showMessage("Usuário removido com sucesso!");
        this.userService.read().subscribe((userData) => {
          this.users = userData;
        });
      });
  }
}
