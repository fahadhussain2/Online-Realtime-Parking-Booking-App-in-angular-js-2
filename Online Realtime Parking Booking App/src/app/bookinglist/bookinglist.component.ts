import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import "rxjs/add/operator/filter";    
@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {

  myBookings$:FirebaseListObservable<any>;
  mybookings=[];
  allbookings=[];
  uids=[];
  isAdmin:boolean=false;
  uid;
  timeout:boolean=false;
  keys=[];

  constructor(private af:AngularFire) {
    this.af.auth.subscribe(user =>{
      if(user !== null){
      this.uid=user.uid;
      this.af.database.object('accounts/' + user.uid).subscribe(admin=>{
          if(admin.email === 'admin@gmail.com'){
            this.isAdmin = true;
            
            this.af.database.list('bookings/').subscribe(bookings=>{
              let tmp=[]
              for (let j=0; j<bookings.length; j++){
                this.af.database.object('accounts/' +bookings[j].uid).subscribe(name=>{

                
                tmp.push({
                  name:name.fname,
                  id:bookings[j].slot,
                  date: bookings[j].date,
                  starttime: parseInt(bookings[j].time),
                  endtime:parseInt(bookings[j].time) + parseInt(bookings[j].duration)
                })
              })
                this.uids.push({
                  uid:bookings[j].$key
                })
              }
              this.allbookings=tmp;
            })
          }
      })




      this.af.database.list('bookings/').subscribe(bookings=>{
        let tmp=[];
        for (let i=0; i<bookings.length; i++){
          if(bookings[i].uid === user.uid){
            tmp.push({
            id:bookings[i].slot,
            date: bookings[i].date,
            starttime: parseInt(bookings[i].time),
            endtime:parseInt(bookings[i].time) + parseInt(bookings[i].duration)
          })
          this.keys.push({
                  uid:bookings[i].$key
                })
          }
        }
        this.mybookings=tmp;
      })
      }
      
    })

    
  }

  

  ngOnInit() {
    setTimeout(()=> {
      this.timeout = true;
    }, 3000);
  }

  delete(i){
    this.af.database.object('bookings/' + this.keys[i].uid).remove();
    // this.mybookings.splice(i,1);
    this.keys.splice(i,1);
  }

  admindelete(i){
    this.af.database.object('bookings/' + this.uids[i].uid).remove();
    // this.allbookings.splice(i,1);
    this.uids.splice(i,1);
// console.log(this.allbookings);
    // console.log(this.uids);
  }

}
