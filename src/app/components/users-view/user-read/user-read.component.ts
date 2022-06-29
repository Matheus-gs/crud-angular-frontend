import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { UserCreateComponent } from "../user-create/user-create.component";
import { UserDeleteComponent } from "../user-delete/user-delete.component";

@Component({
  selector: "app-user-read",
  templateUrl: "./user-read.component.html",
  styleUrls: ["./user-read.component.css"],
})
export class UserReadComponent implements OnInit {
  users: User[];
  displayedColumns = ["name", "email", "role", "bornDate", "actions"];
  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.read().subscribe((userData) => {
      this.users = userData;
    });
  }

  handleUpdateUser(id: number): void {
    this.router.navigate([`users/update/${id}`]);
  }

  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: "550px",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userService.read().subscribe((userData) => {
        this.users = userData;
      });
    });
  }

  openDeleteUserModal(id: number): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: "550px",
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userService.read().subscribe((userData) => {
        this.users = userData;
      });
    });
  }

  // handleDeleteUser(id: number): void {
  //   this.userService.delete(id).subscribe(() => {
  //     this.userService.showMessage("Usuário removido com sucesso!");
  //     this.userService.read().subscribe((userData) => {
  //       this.users = userData;
  //     });
  //   });
  // }
}
