import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate {
  constructor(
    private router: Router,
    private userApi: UserServiceService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userApi.isSuperUser()) {
        return true;
      }else{
        this.router.navigate(['/questionario/pendentes']);
      };
  }
  
}
