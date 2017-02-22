import {Injectable} from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {Router} from '@angular/router';
 
@Injectable()

export class UserService{
    

    constructor(private af:AngularFire, public route:Router){}
    
    createUser(userObj){
        let self=this;
        this.af.auth.createUser({
            email:userObj.email,
            password:userObj.passwordfields.pass
        }).then(function (data){
            //console.log('success',data);
            self.af.database.object('accounts/'+ data.uid).set(userObj);
            data.auth.updateProfile({displayName: userObj.fullname, photoURL:"photo"})
            self.route.navigate(['bookingform'])
        
        }).catch(function (err){
            console.log("error",err);
            alert(err);
        })
         
    }

    loginUser(userObj){
        let self=this;
        this.af.auth.login(
        {email: userObj.email,password:userObj.password},
        {provider: AuthProviders.Password, method: AuthMethods.Password})
        .then(function(data){
            //console.log('success',data);
            self.af.database.object('accounts/' + data.uid).subscribe( id => {
                if(id.email === 'admin@gmail.com')
                {
                    self.route.navigate(['bookinglist'])
                }
                else{
                    self.route.navigate(['bookingform']);
                }
            })
            
            
        }).catch(function(err){
            console.log('error',err)
            alert(err);
        })
    }

    logOut(){
        this.af.auth.logout();
        this.route.navigate(['login']);
    }

    bookParking(bookingObj,uid, slot){
        this.af.database.list('bookings/').push(
            {
            uid:uid,
            date: bookingObj.date, 
            time:bookingObj.time,
            duration: bookingObj.duration,
            slot:slot }
        );
    }

    fetchBookings(){
        return this.af.database.list('bookings');
    }

}