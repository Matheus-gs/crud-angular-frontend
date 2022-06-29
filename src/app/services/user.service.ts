import { Injectable } from "@angular/core";

// Material
import { MatSnackBar } from "@angular/material/snack-bar";

// Http Client
import { HttpClient } from "@angular/common/http";

// Models
import { User } from "../models/user.model";

// Rxjs
import { catchError, EMPTY, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "http://localhost:3001/users/";

  users: User[];

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro, tente novamente mais tarde", true);
    return EMPTY;
  }

  isAdult(date: string): boolean {
    const currentYear = new Date().getFullYear();
    const userBornDateYear = new Date(date).getFullYear();
    return currentYear - userBornDateYear >= 18;
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUsers(): Array<User> {
    this.read().subscribe((data) => {
      this.users = data;
    });
    return this.users;
  }

  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  update(id: number, data: User): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<User>(url, data);
  }

  delete(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url);
  }
}
