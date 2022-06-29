import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: "app-user-delete",
  templateUrl: "./user-delete.component.html",
  styleUrls: ["./user-delete.component.css"],
})
export class UserDeleteComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    console.log(this);
  }

  handleDeleteUser(id: any): void {
    this.userService.delete(id).subscribe(() => {
      this.userService.showMessage("Usuário removido com sucesso!");
      this.dialogRef.close();
    });
  }

  confirmDeleteUser(): void {
    const userId = this.data.id;
    this.handleDeleteUser(userId);
  }

  closeDeleteUserModal(): void {
    this.dialogRef.close();
  }
}
