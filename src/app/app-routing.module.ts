import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Views
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { UsersViewComponent } from "./views/users-view/users-view.component";

// Views Components
import { UserCreateComponent } from "./components/users-view/user-create/user-create.component";
import { UserUpdateComponent } from "./components/users-view/user-update/user-update.component";


const routes: Routes = [
  {
    path: "",
    component: HomeViewComponent,
  },
  {
    path: "users",
    component: UsersViewComponent,
  },
  {
    path: "users/create",
    component: UserCreateComponent,
  },
  {
    path: "users/update/:id",
    component: UserUpdateComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
