import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authService/authorization.service";

@Injectable({
    providedIn: 'root'
})

export class authGuard implements CanActivate{

    constructor(private authorizationService: AuthorizationService, private router: Router) {}

    canActivate(): boolean{
        
        if(this.authorizationService.isUserAuthorized()) {
            return true
        } else { 
            this.router.navigate(['/login']);
            return false;
        }
    } 
}
