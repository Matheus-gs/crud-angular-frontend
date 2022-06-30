import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Views
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { UsersViewComponent } from "./views/users-view/users-view.component";

const routes: Routes = [
  {
    path: "",
    component: HomeViewComponent,
  },
  {
    path: "users",
    component: UsersViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
