import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Comision } from '../model/comision';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private subject = new Subject<{ key: string, value: any }>();
  private currentSession: Comision | undefined;

  constructor(private router: Router) {
    this.currentSession = this.loadSessionData();
  }

  isAuthenticated(): boolean {
    return (this.loadSessionData() != undefined) ? true : false;
  };

  setCurrentSession(session: Comision): boolean {
    this.currentSession = session;
    localStorage.setItem('currentUser', JSON.stringify(session));
    return true;
  }

  loadSessionData(): Comision | undefined {
    var sessionStr = localStorage.getItem('currentUser');
    return (sessionStr) ? <Comision> JSON.parse(sessionStr): undefined;
  }
  removeCurrentSession(): void {
    localStorage.removeItem('currentUser');
    this.currentSession = undefined;
  }
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
