import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {UserService} from '../Services/userService';
import {select} from 'ng2-redux';
import {Observable} from 'rxjs'


@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {
  bookingForm:FormGroup;
  bookedslot:number;
  bookings$:FirebaseListObservable<any>;
  bookedslotnumbes=[];
  bookedParkingArr:[{id:number, date:string, starttime:number, endtime:number, duration:number}]=[{id:1, date:'one', starttime:0, endtime:0, duration:0}];
  hours:Array<number>=[1,2,3,4,5]
  uid; 
  slotflag;
  date;
  success:boolean;

  @select (['UserStatusReducer', 'type']) user$: Observable<any>;

  slots  = [
    { id: 1, isBooked: false, color: 'success' },
    { id: 2, isBooked: false, color: 'success' },
    { id: 3, isBooked: false, color: 'success' },
    { id: 4, isBooked: false, color: 'success' },
    { id: 5, isBooked: false, color: 'success' },
    { id: 6, isBooked: false, color: 'success' },
    { id: 7, isBooked: false, color: 'success' },
    { id: 8, isBooked: false, color: 'success' },
    { id: 9, isBooked: false, color: 'success' },
    { id: 10, isBooked: false, color: 'success' }
  ];  

  constructor(private _formbuilder:FormBuilder, private af:AngularFire, private us: UserService) {
    this.bookingForm=this._formbuilder.group({
      date:['',Validators.required],
      time:['',Validators.required],
      duration:['',Validators.required]
    })

    this.af.auth.subscribe((auth)=>{
      if (auth !== null){
        this.uid=auth.uid;
      }
    })

    // this.bookings$= this.us.fetchBookings();
    
    this.us.fetchBookings().subscribe(data=>{
      
      data.forEach(element => {
        
        this.bookedParkingArr.push({
          id:element.slot,
          date:element.date,
          starttime: parseInt(element.time),
          endtime: parseInt(element.time) + parseInt(element.duration),
          duration: parseInt(element.duration),
        })
        console.log(this.bookedParkingArr);
        // this.bookedArr.push(element);
        // // console.log('booked',element.slot.id)
        // this.slots[5].id = element.slot.id;
        // this.slots[5].color = element.slot.color; 
        // this.slots[5].isBooked = element.slot.isBooked;
      });
    })
    
    this.date= new Date().toISOString().slice(0,10);
    console.log('date',this.date);

    
  }

  ngOnInit() {
  }

  bookParking(){
    console.log(this.bookingForm.value);
    this.us.bookParking(this.bookingForm.value,this.uid, this.bookedslot);
    this.success= true;
  }
  
  validate(slot){
  

    let time= parseInt(this.bookingForm.value.time);
    let endtime= parseInt(this.bookingForm.value.time) + parseInt(this.bookingForm.value.duration);

    for (let i=0 ; i<this.bookedParkingArr.length; i++){
    
      if (this.bookingForm.value.date === this.bookedParkingArr[i].date){
        if((time >= this.bookedParkingArr[i].starttime && time < this.bookedParkingArr[i].endtime && this.bookedParkingArr[i].id=== slot)){
          console.log(this.bookedParkingArr[i].starttime)
          return true
        }
        else if(time <this.bookedParkingArr[i].starttime && endtime > this.bookedParkingArr[i].starttime && this.bookedParkingArr[i].id=== slot){
          return true
        }
      }
    }
    
    // this.bookedParkingArr.forEach(element => {
      
    //   let self=element;
    //   if(this.bookingForm.value.date === element.date){
        
    //     let time= parseInt(this.bookingForm.value.time);
    //     let endtime= parseInt(this.bookingForm.value.time) + parseInt(this.bookingForm.value.duration);
    //     console.log(this.bookedslot, element.id)
        
    //     if(time >= element.starttime && time < element.endtime && this.bookedslot === element.id){ 
          
         
    //      return true;
    //   }
    
      // else{
      //   this.slots[self.id]= {id:self.id, isBooked:false, color:'success'};
      // }
      return false;
      }
      // else{
      //   this.slots[self.id]= {id:self.id, isBooked:false, color:'success'};
      // }
      
  //   });
  //   return false;
    
  // }

  bookSlot(i,slotid){
    
    this.bookedslot = slotid;
    console.log(this.bookedslot);
     
  }
  
  check(){
    if(this.date > this.bookingForm.value.date)
    {
      alert('please select future date')
     
    }
  }

}
