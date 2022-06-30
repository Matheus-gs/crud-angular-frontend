import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { UserCreateComponent } from "../user-create/user-create.component";
import { UserDeleteComponent } from "../user-delete/user-delete.component";
import { UserUpdateComponent } from "../user-update/user-update.component";

@Component({
  selector: "app-user-read",
  templateUrl: "./user-read.component.html",
  styleUrls: ["./user-read.component.css"],
})
export class UserReadComponent implements OnInit {
  users: User[];
  displayedColumns = ["name", "email", "role", "bornDate", "actions"];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.read().subscribe((userData) => {
      this.users = userData;
    });
  }

  updateTable(): void {
    this.userService.read().subscribe((userData) => {
      this.users = userData;
    });
  }

  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: "550px",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  openUpdateUserModal(id: number): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: "550px",
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
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
      this.updateTable();
    });
  }
}
