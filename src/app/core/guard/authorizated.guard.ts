import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

import { StorageService } from '../../convocatoria/services/storage.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private storageService: StorageService) { }

  canActivate() {
    return this.validateCanActivate();
  }

  canActivateChild() {
    return this.validateCanActivate();
  }

  private validateCanActivate() {
    if (this.storageService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}