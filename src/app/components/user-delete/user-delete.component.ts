import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";


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

  ngOnInit(): void {}

  handleDeleteUser(): void {
    const id = this.data.id;
    this.userService.delete(id).subscribe(() => {
      this.userService.showMessage("Usuário removido com sucesso!");
      this.dialogRef.close();
    });
  }

  closeDeleteUserModal(): void {
    this.dialogRef.close();
  }
}
