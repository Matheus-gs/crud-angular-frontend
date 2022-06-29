import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-view",
  templateUrl: "./users-view.component.html",
  styleUrls: ["./users-view.component.css"],
})
export class UsersViewComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToUserCreate(): void {
    this.router.navigate(['users/create'])
  }
}
