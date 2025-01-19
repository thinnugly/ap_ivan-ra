import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return typeof TOKEN !== 'undefined' ? localStorage.getItem(TOKEN) : null;
  }

  static getUser(): any{
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string{
    const user = this.getUser();
    return user ? user.userRole : '';
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    const role = this.getUserRole();
    return role === "ADMIN";
  }

  static isEmployeeLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    const role = this.getUserRole();
    return role === "EMPLOYEE";
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : null;
  }
  
  static logout(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
