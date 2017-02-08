
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseAuthState, AngularFireAuth } from 'angularfire2';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";    

@Injectable()
export class AuthGuard implements CanActivate {

    login_flag:boolean=true;

    constructor(private af: AngularFire, private route: Router) { }
    canActivate() {
        return this.af.auth.map(user => {
            if (user != null) {
                this.login_flag=true;
                    
                return true;
                
            }
            else {
                this.login_flag=false;
                alert("Access Denied! Please login");
                this.route.navigate(['login']);
                return false;

            }
        }) .take(1) 

    }
    
}


