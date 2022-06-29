import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Angular Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatTableModule} from "@angular/material/table"
import {MatIconModule} from "@angular/material/icon"
import {MatDialogModule} from '@angular/material/dialog';

// Http Client
import { HttpClientModule } from "@angular/common/http";

// Components
import { NavComponent } from "./components/template/nav/nav.component";
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { UsersViewComponent } from "./views/users-view/users-view.component";
import { UserCreateComponent } from "./components/users-view/user-create/user-create.component";
import { UserReadComponent } from './components/users-view/user-read/user-read.component';
import { UserUpdateComponent } from './components/users-view/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    // Components
    NavComponent,
    HomeViewComponent,
    UsersViewComponent,
    UserCreateComponent,
    UserReadComponent,
    UserUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angular Forms
    FormsModule,
    ReactiveFormsModule,  
    // Material
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    // Http Client
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
